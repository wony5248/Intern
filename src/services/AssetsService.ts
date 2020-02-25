import axios from 'axios';
import _ from 'lodash';
import ServiceUtils from '../utils/ServiceUtils';

const getAssets = async (params:any) => {
  const apiCall = async () => {
    const res = await axios.get(`/assets/?${ServiceUtils.getParamString(params)}`, { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() });
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const getAssetId = async (params:any) => {
  const apiCall = async () => {
    const res = await axios.get(`/assets_id/?${ServiceUtils.getParamString(params)}`, { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() });
    return res.data;
  }

  return await ServiceUtils.callApi(apiCall);
}


const getAsset = async (assetId:any) => {
  const apiCall = async () => {
    const assetRes = await axios.get(`/assets/${assetId}/`, { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() });
    const asset = assetRes.data;
    if (asset.info.type === 'img-presigned-url') {
      const urlRes = await axios.post(`/assets/${assetId}/read-signed-url/`, {}, ServiceUtils.getAxiosConfig());
      const assetWithUrl = await _.set(asset, 'info', { url: urlRes.data.url });
      return assetWithUrl;
    } else {
      return asset;
    }
  }

  return await ServiceUtils.callApi(apiCall);
}

const getDatasets = async (params:any) => {
  const apiCall = async () => {
    const response = await axios.get(`/assets/groups/?${ServiceUtils.getParamString(params)}`, { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() });
    return response.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const updateDatasetName = async (curName:any, newName:any) => {
  const apiCall = async () => {
    const response = await axios.put(`/assets/groups/${curName}/`, { group: newName }, ServiceUtils.getAxiosConfig());
    return response.data;
  }

  return await ServiceUtils.callApi(apiCall);
}

const updateAssetToLabel = async (projectId:any, assetId:any) => {
  const apiCall = async () => {
    await axios.post(`/projects/${projectId}/assets/${assetId}/labels/`, {}, ServiceUtils.getAxiosConfig());
  }

  await ServiceUtils.callApi(apiCall);
}

const updateDatasetToLabel = async (projectId:any, assetGroupName:any) => {
  const apiCall = async () => {
    await axios.post(`/projects/${projectId}/assets/groups/${assetGroupName}/labels/`, {}, ServiceUtils.getAxiosConfig());
  }

  await ServiceUtils.callApi(apiCall);
}

const deleteAsset = async (assetId:any) => {
  const apiCall = async () => {
    await axios.delete(`/assets/${assetId}/`, ServiceUtils.getAxiosConfig());
  }

  await ServiceUtils.callApi(apiCall);
}

export default {
  getAssets,
  getAssetId,
  getAsset,
  getDatasets,
  updateDatasetName,
  updateAssetToLabel,
  updateDatasetToLabel,
  deleteAsset,
}