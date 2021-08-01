import axios from "axios";
import _ from "lodash";

import ServiceUtils from "../utils/ServiceUtils";
import FileService from "./FileService";
import ProjectUtils from "../utils/ProjectUtils";

const createProject = async (
  newProjectInfo: any,
  classList: any,
  groupList: any,
  categorization: any
) => {
  const projectInfo = {
    name: newProjectInfo.projectName,
    description: "description",
    workapp: ProjectUtils.getWorkapp(newProjectInfo.dataType),
    labelInterface: ProjectUtils.convertToLabelInterface(
      classList,
      groupList,
      categorization
    ),
    setting: {}
  };

  const apiCall = async () => {
    const res = await axios.post(
      `/projects/`,
      ServiceUtils.toSnakeCaseKeys(projectInfo),
      ServiceUtils.getAxiosConfig()
    );
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getProject = async (projectId: any) => {
  const apiCall = async () => {
    const res = await axios.get(`/projects/${projectId}/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const updateProject = async (projectId: any, newInfo: any) => {
  const apiCall = async () => {
    const res = await axios.patch(`/projects/${projectId}/`, newInfo, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const deleteProject = async (projectId: any) => {
  const apiCall = async () => {
    const res = await axios.delete(`/projects/${projectId}/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getUsers = async (projectId: any) => {
  const apiCall = async () => {
    const res = await axios.get(`/projects/${projectId}/users/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getCollaborators = async (projectId: any) => {
  const apiCall = async () => {
    const res = await axios.get(`/projects/${projectId}/invites/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getUserRole = async (projectId: any, userId: any) => {
  const apiCall = async () => {
    const res = await axios.get(
      `/projects/${projectId}/invites/users/${userId}/`,
      { ...ServiceUtils.getAxiosConfig(), ...ServiceUtils.getAxiosRetry() }
    );
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const updateUserRole = async (projectId: any, userId: any, nextRole: any) => {
  const apiCall = async () => {
    const res = await axios.put(
      `/projects/${projectId}/invites/users/${userId}/`,
      { role: nextRole.toLowerCase() },
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const deleteUserRole = async (projectId: any, userId: any) => {
  const apiCall = async () => {
    const res = await axios.delete(
      `/projects/${projectId}/invites/users/${userId}/`,
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getTags = async (projectId: any) => {
  const apiCall = async () => {
    const res = await axios.get(`/projects/${projectId}/tags/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const createTag = async (projectId: any, tagInfo: any) => {
  const apiCall = async () => {
    const res = await axios.post(
      `/projects/${projectId}/tags/`,
      tagInfo,
      ServiceUtils.getAxiosConfig()
    );
    return res.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const deleteTag = async (projectId: any, tagId: any) => {
  const apiCall = async () => {
    const res = await axios.delete(
      `/projects/${projectId}/tags/${tagId}/`,
      ServiceUtils.getAxiosConfig()
    );
    return res;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getGuidelines = async (projectId: any) => {
  const apiCall = async () => {
    const guidelines = await axios.get(`/projects/${projectId}/guidelines/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return guidelines.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const uploadGuidelines = async (projectId: any, fileInfo: any, file: any) => {
  const apiCall = async () => {
    const presignedUrlRes = await axios.post(
      `/projects/${projectId}/guidelines/prep/`,
      {
        type: "file",
        size: fileInfo.size
      },
      ServiceUtils.getAxiosConfig()
    );
    const presignedUrlWithParams = presignedUrlRes.data.url;
    const presignedUrl =
      "tenant" + presignedUrlWithParams.split("?")[0].split("/tenant")[1];

    await FileService.uploadPresignedFiles(presignedUrlWithParams, file);

    await axios.post(
      `/projects/${projectId}/guidelines/`,
      _.assign(fileInfo, { path: presignedUrl }),
      ServiceUtils.getAxiosConfig()
    );
  };

  await ServiceUtils.callApi(apiCall);
};

const downloadGuideline = async (projectId: any, guidelineId: any) => {
  const apiCall = async () => {
    const file = await axios.post(
      `/projects/${projectId}/guidelines/${guidelineId}/`,
      {},
      ServiceUtils.getAxiosConfig()
    );
    return file.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

const getTodoList = async (projectId: any) => {
  const apiCall = async () => {
    const todoRes = await axios.get(`/projects/${projectId}/todolist/`, {
      ...ServiceUtils.getAxiosConfig(),
      ...ServiceUtils.getAxiosRetry()
    });
    return todoRes.data;
  };

  return await ServiceUtils.callApi(apiCall);
};

export default {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getUsers,
  getCollaborators,
  getUserRole,
  updateUserRole,
  deleteUserRole,
  getTags,
  createTag,
  deleteTag,
  getGuidelines,
  uploadGuidelines,
  downloadGuideline,
  getTodoList
};
