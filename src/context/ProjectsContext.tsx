import React from "react";
import _ from "lodash";

import ProjectsService from "services/ProjectsService";
import AuthContext from "context/AuthContext";
import UserUtils from "utils/UserUtils";

const Context = React.createContext<any | undefined>(undefined);
interface ProjectsInterface {
  projects?: any;
  totalCount?: number;
  projectsOptions?: {};
  projectIds?: any;
  searchedProjectIds?: any;
  owners?: any[];
  admins?: any[];
  collaborators?: any[];
  idleCollaborators?: any[];
  userObjects?: {};
  children?: React.ReactNode;
}
const ProjectsProvider = (props: ProjectsInterface) => {
  const [projects, setProjects] = React.useState(null);
  const [totalCount, setTotalCount] = React.useState(0);
  const [projectsOptions, setProjectsOptions] = React.useState({});
  const [projectIds, setProjectIds] = React.useState(null);
  const [searchedProjectIds, setSearchedProjectIds] = React.useState(null);
  const [owners, setOwners] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [collaborators, setCollaborators] = React.useState([]);
  const [idleCollaborators, setIdleCollaborators] = React.useState([]);
  const [userObjects, setUserObjects] = React.useState({});

  const authInfo: any = React.useContext(AuthContext.Context);

  const updateProjects = async (params: any) => {
    setProjects([]);
    const projects = await ProjectsService.getProjects(params);

    if (!projects) return;

    const projectIds: any = {};
    // tslint:disable-next-line: no-shadowed-variable
    const projectsOptions = _.concat(
      [
        {
          label: "all",
          options: [{ label: "[ all projects ]", value: "[ all projects ]" }]
        }
      ],
      {
        label: "projects",
        options: _.map(projects.results, project => {
          projectIds[project.name] = project.id;
          return { label: project.name, value: project.name };
        })
      }
    );

    setProjects(projects.results);
    setTotalCount(projects.count);
    setProjectIds(projectIds);
    setProjectsOptions(projectsOptions);
  };

  const updateMembers = async () => {
    if (authInfo.role !== "collaborator") {
      const users: any[] = await ProjectsService.getUsers();
      const nextIdleCollaborators = await ProjectsService.getIdleUsers();

      setOwners(users[0].users);
      setAdmins(users[1].users);
      setCollaborators(users[2].users);
      setIdleCollaborators(nextIdleCollaborators.users);

      const nextUserObjects = UserUtils.createUserObjects(
        users[0].users,
        users[1].users,
        users[2].users
      );
      setUserObjects(nextUserObjects);
    }
  };

  return (
    <Context.Provider
      value={{
        projects,
        setProjects,
        totalCount,
        setTotalCount,
        projectsOptions,
        setProjectsOptions,
        projectIds,
        setProjectIds,
        searchedProjectIds,
        setSearchedProjectIds,
        owners,
        setOwners,
        admins,
        setAdmins,
        collaborators,
        setCollaborators,
        idleCollaborators,
        setIdleCollaborators,
        updateMembers,
        updateProjects,
        userObjects,
        setUserObjects
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: ProjectsProvider
};
