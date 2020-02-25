import _ from 'lodash';

import AssetsService from 'services/AssetsService';
import ProjectsService from 'services/ProjectsService';

const handleSearchDataset = async (inputValue:any) => {
  const datasetList = await AssetsService.getDatasets({ groupIcontains: inputValue });
  return _.map(datasetList.results, result => ({ label: result.group, value: result.group }));
}

const handleSearchProject = async (inputValue:any, projectsInfo:any) => {
  const projectList:any = await ProjectsService.getProjects({ nameIcontains: inputValue });
  let searchProjectIds :any= {};
  const resultProjects :any= _.map(projectList.results, project => {
    searchProjectIds[project.name] = project.id;
    return ({ label: project.name, value: project.name });
  });

  projectsInfo.setSearchedProjectIds(searchProjectIds);
  return resultProjects;
}

export default { handleSearchDataset, handleSearchProject };