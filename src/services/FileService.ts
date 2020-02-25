import _ from "lodash";
import axios from "axios";
import ServiceUtils from "utils/ServiceUtils";

const uploadWithUrl = async (url: any) => {
  const urlInfo = _.mapKeys(url, (value, key) =>
    key === "dataKey" ? "key" : key
  );

  if (urlInfo.key.length > 255) {
    throw new Error("shorter data key required");
  }

  const apiCall = async () => {
    const res = await axios.post(
      "/assets/typed/img-url/",
      ServiceUtils.toSnakeCaseKeys(urlInfo),
      ServiceUtils.getAxiosConfig()
    );
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const uploadFiles = async (fileInfo: any, file: any) => {
  if (fileInfo.key.length > 255) {
    throw new Error("Shorter data key required");
  }

  if (file.size > 10485760) {
    throw new Error("File exceeds the size limit of 10 MB");
  }

  const apiCall = async () => {
    const assetRes = await axios.post(
      "/assets/typed/img-presigned-url/",
      ServiceUtils.toSnakeCaseKeys(fileInfo),
      ServiceUtils.getAxiosConfig()
    );
    const uploadInfoRes = await axios.post(
      `/assets/${assetRes.data.id}/upload-url/`,
      {},
      ServiceUtils.getAxiosConfig()
    );
    const presignedUrlRes = await uploadPresignedFiles(
      uploadInfoRes.data.url,
      file
    );
    return { id: assetRes.data.id, ...presignedUrlRes };
  };

  return await ServiceUtils.callApi(apiCall);
};

const registerUploadedAssetToLabel = async (projectId: any, assetId: any) => {
  const apiCall = async () => {
    const res = await axios.post(
      `/projects/${projectId}/assets/${assetId}/labels/`,
      {},
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const uploadPresignedFiles = async (uploadUrl: any, file: any) => {
  const config = {
    headers: {
      "Content-Type": "application/octet-stream"
    },
    transformRequest: [
      (data: any, headers: any) => {
        delete headers.common.Authorization;
        return data;
      }
    ]
  };

  const apiCall = async () => {
    const res = await axios.put(uploadUrl, file, config);
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getPaginatedFiles = async () => {
  const apiCall = async () => {
    const res = await axios.get("/dataset/attributes/", {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data.data.files;
  };

  return await ServiceUtils.callApi(apiCall);
};

export default {
  uploadWithUrl,
  uploadFiles,
  registerUploadedAssetToLabel,
  uploadPresignedFiles,
  getPaginatedFiles
};
