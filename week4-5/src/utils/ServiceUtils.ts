import * as Sentry from "@sentry/browser";
import axios from "axios";
import axiosRetry from "axios-retry";
import exponentialDelay from "axios-retry";
import _ from "lodash";
import qs from "qs";
import AuthService from "services/AuthService";
import moment from "moment";
import jwt_decode from "jwt-decode";

const toCamelCaseKeys: any = (node: any) => {
  if (node instanceof Array) {
    return _.map(node, toCamelCaseKeys);
  }
  if (node instanceof Object) {
    return _.mapValues(
      _.mapKeys(node, (v, k) => _.camelCase(k)),
      toCamelCaseKeys
    );
  }

  return node;
};

const toSnakeCaseKeys: any = (node: any) => {
  if (node instanceof Array) {
    return _.map(node, toSnakeCaseKeys);
  }
  if (node instanceof Object) {
    return _.mapValues(
      _.mapKeys(node, (v, k) => _.snakeCase(k)),
      toSnakeCaseKeys
    );
  }
  return node;
};

const getAuthAxiosConfig: any = () => {
  return {
    baseURL: `https://${process.env.REACT_APP_API_HOST}/`,
    crossdomain: true,
    transformResponse: [].concat(
      axios.defaults.transformResponse,
      toCamelCaseKeys
    ),
    transformRequest: [].concat(
      axios.defaults.transformRequest,
      (data: any, headers: any) => {
        delete headers.common.Authorization;
        return data;
      }
    ),
    timeout: 60000
  };
};

const getAxiosConfig = () => {
  return {
    baseURL: `https://${process.env.REACT_APP_API_HOST}/`,
    crossdomain: true,
    transformResponse: [].concat(
      axios.defaults.transformResponse,
      toCamelCaseKeys
    ),
    timeout: 60000
  };
};

const getWaitlistAxiosConfig = () => {
  return {
    baseURL: `https://${process.env.REACT_APP_EMAIL_SENDER_HOST}/`,
    crossdomain: true,
    transformResponse: [].concat(
      axios.defaults.transformResponse,
      toCamelCaseKeys
    ),
    timeout: 60000
  };
};

axiosRetry(axios);
const getAxiosRetry = () => {
  return {
    "axios-retry": {
      retries: 6,
      retryDelay: exponentialDelay
    }
  };
};

const getParamString = (params: any) => {
  return qs.stringify(toSnakeCaseKeys(params), {
    arrayFormat: "brackets",
    encode: false
  });
};

const handleAuthError = (err: any) => {
  if (!err.response) {
    throw err;
  } else {
    switch (err.response.status) {
      case 400:
        if (err.response.data && err.response.data.code) {
          switch (err.response.data.code) {
            case "003400":
              throw new Error("Wrong Password!");
            case "201400":
              throw new Error("That account name is not registered");
            case "202400":
              throw new Error("That email is not registered");
            case "211400":
              throw new Error("Your account has been locked");
            case "212400":
              throw new Error("Please activate your account first");
            default:
              throw new Error("Unknown code");
          }
        }
        throw new Error("Bad request");
      default:
        throw err;
    }
  }
};

const handleErrorAfterLogin = (err: any) => {
  if (!err.response) {
    throw err;
  } else {
    const { status } = err.response;
    switch (status) {
      case 400:
        if (err.response.data && err.response.data.code === "003400") {
          window.location.replace("/auth");
        }
        throw new Error("Bad request");
      case 403:
        switch (err.response.data.code) {
          case "403001":
            throw new Error(
              "You have reached the limit for number of user seats"
            );
          case "403002":
            throw new Error("You have reached the limit for data storage");
          default:
            throw new Error("Not Authorized");
        }
      case 404:
        throw new Error("Not Found");
      case 409:
        throw new Error("Duplicated");
      default:
        throw err;
    }
  }
};

const handleLoginRefresh = async () => {
  const epoch = jwt_decode<any>(localStorage.getItem("spb_user")!).exp;
  const localDate: any = new Date(0);
  localDate.setUTCSeconds(epoch);
  if (moment(localDate).diff(moment(), "minutes") <= 5) {
    await AuthService.loginRefresh();
  }
};

const callApi = async (apiCall: any, errorHandling?: any) => {
  try {
    await handleLoginRefresh();
    const response = await apiCall();
    return response;
  } catch (err) {
    handleSentryLogging(err);
    errorHandling && errorHandling();
    handleErrorAfterLogin(err);
  }
};

const handleSentryLogging = (err: any) => {
  if (!err.response) {
    logSentry(err);
    throw err;
  } else {
    const { status } = err.response;
    switch (true) {
      case /^4/.test(status):
        logSentry(err, "warning");
        break;
      case /^5/.test(status):
        logSentry(err, "error");
        break;
      default:
        logSentry(err, "info");
    }
  }
};

const logSentry = (err: any, level = "error") => {
  const spb_auth_base64 = localStorage.getItem("spb_user");
  const auth: any = spb_auth_base64 ? jwt_decode(spb_auth_base64) : null;
  if (auth) {
    Sentry.setUser({
      email: auth["email"],
      id: auth["custom:tenant_name"],
      username: `${auth["given_name"]} ${auth["family_name"]}`
    });
  }
  if (err.response) {
    Sentry.configureScope(function(scope) {
      scope.setTag("correlation_id", err.response.headers["x-correlation-id"]);
    });
  }
  Sentry.captureException(err /*{ level }*/);
};

export default {
  toCamelCaseKeys,
  toSnakeCaseKeys,
  getAuthAxiosConfig,
  getAxiosConfig,
  getWaitlistAxiosConfig,
  getAxiosRetry,
  getParamString,
  handleAuthError,
  handleErrorAfterLogin,
  callApi,
  logSentry
};
