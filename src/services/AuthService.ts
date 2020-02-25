import axios from "axios";
import jwt_decode from "jwt-decode";

import ServiceUtils from "utils/ServiceUtils";

const createAccount: any = async (inputInfo: any) => {
  try {
    const res: any = await axios.post(
      "/auth/reg",
      ServiceUtils.toSnakeCaseKeys(inputInfo),
      ServiceUtils.getAuthAxiosConfig()
    );
    return res;
  } catch (err) {
    if (err.response.status === 404) {
      // TODO(shko): string으로 변경
      if (
        err.response.data.code === 202404 ||
        err.response.data.code === "202404"
      ) {
        throw new Error("Not on waitlist");
      }
    }
    throw new Error("Error");
  }
};

const confirmAccount: any = async (info: any) => {
  return await axios.post(
    "/auth/confirm",
    ServiceUtils.toSnakeCaseKeys(info),
    ServiceUtils.getAuthAxiosConfig()
  );
};

const resendCode = async (accountName: string, email: string) => {
  const info: any = { email, tenantId: accountName };
  try {
    await axios.post(
      "/auth/resend",
      ServiceUtils.toSnakeCaseKeys(info),
      ServiceUtils.getAuthAxiosConfig()
    );
  } catch (err) {
    if (err.response.status === 412) {
      switch (err.response.data.code) {
        case "201412":
          throw new Error("Your account has been already activated");
        default:
          throw new Error("Unknown Error");
      }
    }
  }
};

const checkAccountName = async (accountName: string) => {
  try {
    const res: any = await axios.get(`/auth/reg?tenant_id=${accountName}`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res;
  } catch (err) {
    if (err.response.status === 412) {
      throw new Error("Already exists");
    }
  }
};

const checkEmail: any = async (accountName: string, email: string) => {
  try {
    const res = await axios.get(
      `/auth/reg?tenant_id=${accountName}&email=${email}`,
      { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

const login = async (inputInfo: any) => {
  try {
    const userToken = await axios.post(
      "/auth/login",
      ServiceUtils.toSnakeCaseKeys(inputInfo),
      ServiceUtils.getAuthAxiosConfig()
    );

    const { message } = userToken.data;
    const { accessToken, idToken, refreshToken } = userToken.data.data;

    if (message === "Force change password") {
    } else {
      localStorage.setItem("spb_access", accessToken);
      localStorage.setItem("spb_user", idToken);
      localStorage.setItem("spb_", refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${idToken}`;
    }

    return userToken.data.data;
  } catch (err) {
    ServiceUtils.handleAuthError(err);
  }
};

const changePasswordAfterInvite = async (inputInfo: any) => {
  try {
    const res = await axios.post(
      "/auth/force-change-password",
      ServiceUtils.toSnakeCaseKeys(inputInfo),
      ServiceUtils.getAuthAxiosConfig()
    );
    return res;
  } catch (err) {
    // TODO (tsnoh): error handling
  }
};

const loginRefresh = async () => {
  try {
    const res = await axios.post(
      "/auth/refresh",
      ServiceUtils.toSnakeCaseKeys({
        idToken: localStorage.getItem("spb_user"),
        refreshToken: localStorage.getItem("spb_")
      }),
      ServiceUtils.getAuthAxiosConfig()
    );

    const { accessToken, idToken } = res.data.data;
    const userInfo: any = jwt_decode(idToken);

    localStorage.setItem("spb_access", accessToken);
    localStorage.setItem("spb_user", idToken);
    axios.defaults.headers.common.Authorization = `Bearer ${idToken}`;

    window.analytics.track("refresh", {
      category: userInfo["custom:tenant_name"],
      label: userInfo.email,
      value: Date.now()
    });

    window.analytics.identify(userInfo["custom:tenant_name"], {
      name: `${userInfo["given_name"]} ${userInfo["family_name"]}`,
      email: userInfo.email
    });
  } catch (err) {
    ServiceUtils.handleErrorAfterLogin(err);
  }
};

const loginWithStorage = (idToken: any) => {
  idToken = localStorage.getItem("spb_user");

  if (!idToken) throw new Error("Not logged in");

  axios.defaults.headers.common.Authorization = `Bearer ${idToken}`;
  return jwt_decode<any>(idToken);
};

const logout = () => {
  localStorage.removeItem("spb_access");
  localStorage.removeItem("spb_user");
  localStorage.removeItem("spb_");
  delete axios.defaults.headers.common.Authorization;
};

const forgotPassword = async (accountName: string, email: string) => {
  try {
    const res = await axios.post(
      "/auth/reset-password",
      ServiceUtils.toSnakeCaseKeys({
        tenant_id: accountName,
        email
      }),
      ServiceUtils.getAuthAxiosConfig()
    );
    return res;
  } catch (err) {
    if (err.response.status === 400) {
      switch (err.response.data.code) {
        case "204400":
          throw new Error("That Account ID doesn't exist");
        case "203400":
          throw new Error("That Email doesn't exist");
        default:
          throw new Error("Unknown Error");
      }
    }
    if (err.response.status === 412) {
      switch (err.response.data.code) {
        case "200412":
          throw new Error(
            "That Account is not activated. Please check your email."
          );
        default:
          throw new Error("Unknown Error");
      }
    }
    if (err.response.status === 500) {
      switch (err.response.data.code) {
        case "006400":
          throw new Error(
            "You've made an attempt more than 5 times. Please try after an hour"
          );
        default:
          throw new Error("Unknown Error");
      }
    }
    throw new Error("Unknown Error");
  }
};

const changePasswordAfterForgotPassword = async (inputInfo: any) => {
  try {
    const res = await axios.post(
      "/auth/reset-password/confirm",
      ServiceUtils.toSnakeCaseKeys(inputInfo),
      ServiceUtils.getAuthAxiosConfig()
    );
    return res;
  } catch (err) {
    // TODO (tsnoh): error handling
  }
};

const changePasswordOnAccount = async (
  oldPassword: string,
  newPassword: string
) => {
  const apiCall = async () => {
    const res = await axios.put(
      "/auth/users/change-password",
      ServiceUtils.toSnakeCaseKeys({
        accessToken: localStorage.getItem("spb_access"),
        oldPassword,
        newPassword
      }),
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getUserInfo = async (userEmail: string) => {
  const apiCall = async () => {
    const res = await axios.get(
      `/auth/users/profile?user_name=${userEmail}`,
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const changeName = async (givenName: string, familyName: string) => {
  const apiCall = async () => {
    const res = await axios.put(
      `/auth/users/profile`,
      ServiceUtils.toSnakeCaseKeys({
        accessToken: localStorage.getItem("spb_access"),
        givenName,
        familyName
      }),
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const uploadAvatar = async (avatar: any) => {
  const apiCall = async () => {
    const res = await axios.post(
      `/auth/users/profile/avatar`,
      ServiceUtils.toSnakeCaseKeys({
        accessToken: localStorage.getItem("spb_access"),
        avatar
      }),
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

export default {
  createAccount,
  confirmAccount,
  resendCode,
  login,
  changePasswordAfterInvite,
  loginRefresh,
  loginWithStorage,
  logout,
  checkAccountName,
  checkEmail,
  forgotPassword,
  changePasswordAfterForgotPassword,
  changePasswordOnAccount,
  getUserInfo,
  changeName,
  uploadAvatar
};
