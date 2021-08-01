import axios from "axios";
import ServiceUtils from "utils/ServiceUtils";

const getNotifications = async (lastCreatedAt: any) => {
  const date = new Date(lastCreatedAt).toISOString();
  const apiCall = async () => {
    const res = await axios.get(
      `https://${process.env.REACT_APP_API_HOST}/notifications/?last_created_at=${date}`,
      { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() }
    );
    return ServiceUtils.toCamelCaseKeys(res.data.data);
  };

  return await ServiceUtils.callApi(apiCall);
};

const readNotification = async (ids: any) => {
  const apiCall = async () => {
    await axios.put(
      `https://${process.env.REACT_APP_API_HOST}/notifications/`,
      { ids },
      ServiceUtils.getAxiosConfig()
    );
  };

  await ServiceUtils.callApi(apiCall);
};

const markAllAsRead = async () => {
  const apiCall = async () => {
    await axios.delete(
      `https://${process.env.REACT_APP_API_HOST}/notifications/`,
      ServiceUtils.getAxiosConfig()
    );
  };

  await ServiceUtils.callApi(apiCall);
};

export default {
  getNotifications,
  readNotification,
  markAllAsRead
};
