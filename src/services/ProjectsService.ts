
import axios from 'axios';
import ServiceUtils from '../utils/ServiceUtils';

const getProjects = async (params:any) => {
  const apiCall = async () => {
    const res = await axios.get(`/projects/?${ServiceUtils.getParamString(params)}`, { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() });
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const getUsers = async () => {
  const apiCall = async () => {
    const res = await axios.get('/users/', { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() })
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const getIdleUsers = async () => {
  const apiCall = async () => {
    const res = await axios.get('/users/idle/', { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() })
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const deleteUser = async (userEmail:string) => {
  const apiCall = async () => {
    const res = await axios.delete(`/auth/users/${userEmail}`, { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() })
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const getUsages = async () => {
  const apiCall = async () => {
    const res = await axios.get('/usages/storages/', { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() })
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

export default {
  getProjects,
  getUsers,
  getIdleUsers,
  deleteUser,
  getUsages
}