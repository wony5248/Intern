import React from "react";
import _ from "lodash";

import ProjectService from "../services/ProjectService";
import UserRoleUtils from "../utils/UserRoleUtils";
import UserUtils from "../utils/UserUtils";

const Context = React.createContext<any | undefined>(undefined);

const ProjectProvider = (props: any) => {
  // TODO (tsnoh): 명칭 변화로 밑의 변수중 사용되지 않은게 있을 수 있음
  // 기능 완성 후 찾아서 삭제할 예정
  const [project, setProject] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);
  const [owners, setOwners] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [managers, setManagers] = React.useState([]);
  const [workers, setWorkers] = React.useState([]);
  const [collaborators, setCollaborators] = React.useState([]);
  const [assigneeOptions, setAssigneeOptions] = React.useState([]);
  const [classOptions, setClassOptions] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [tagIds, setTagIds] = React.useState({});
  const [tagOptions, setTagOptions] = React.useState([]);
  const [groups, setGroups] = React.useState({});
  const [classes, setClasses] = React.useState({});
  const [userObjects, setUserObjects] = React.useState({});

  const updateMembers = async (projectId: any) => {
    const users = await ProjectService.getUsers(projectId);
    setOwners(users[0].users);
    setAdmins(users[1].users);
    setCollaborators(users[2].users);

    const nextUserObjects = UserUtils.createUserObjects(
      users[0].users,
      users[1].users,
      users[2].users
    );
    setUserObjects(nextUserObjects);

    const managers: any = [];
    const workers: any = [];
    _.forEach(users[2].users, user => {
      if (UserRoleUtils.isManager(user.projectRole)) {
        managers.push(user);
      } else {
        workers.push(user);
      }
    });

    setManagers(managers);
    setWorkers(workers);

    const assigneeOptions: any = [
      {
        label: "Workers",
        options: _.map(workers, worker => ({
          value: `${worker.name} (${worker.email})`,
          label: `${worker.name} (${worker.email})`
        }))
      },
      {
        label: "Managers",
        options: _.map(managers, manager => ({
          value: `${manager.name} (${manager.email})`,
          label: `${manager.name} (${manager.email})`
        }))
      },
      {
        label: "Admin",
        options: _.map(users[1].users, admin => ({
          value: `${admin.name} (${admin.email})`,
          label: `${admin.name} (${admin.email})`
        }))
      },
      {
        label: "Owner",
        options: _.map(users[0].users, owner => ({
          value: `${owner.name} (${owner.email})`,
          label: `${owner.name} (${owner.email})`
        }))
      }
    ];

    setAssigneeOptions(assigneeOptions);
  };

  const updateTags = async (projectId: any) => {
    const tags: any = await ProjectService.getTags(projectId);
    let tagIds: any = {};
    const tagOptions: any = _.map(tags, tag => {
      tagIds[tag.name] = tag.id;
      return { value: tag.name, label: tag.name };
    });
    setTags(tags);
    setTagIds(tagIds);
    setTagOptions(tagOptions);
  };

  const resetProject = () => {
    setProject(null);
    setUserRole(null);
    setOwners([]);
    setAdmins([]);
    setManagers([]);
    setWorkers([]);
    setCollaborators([]);
    setAssigneeOptions([]);
    setClassOptions([]);
    setTags([]);
    setTagIds({});
    setTagOptions([]);
    setGroups({});
    setClasses({});
  };

  return (
    <Context.Provider
      value={{
        project,
        setProject,
        owners,
        setOwners,
        admins,
        setAdmins,
        collaborators,
        setCollaborators,
        managers,
        setManagers,
        workers,
        setWorkers,
        classOptions,
        setClassOptions,
        assigneeOptions,
        setAssigneeOptions,
        tags,
        setTags,
        tagIds,
        setTagIds,
        tagOptions,
        setTagOptions,
        userRole,
        setUserRole,
        groups,
        setGroups,
        classes,
        setClasses,
        userObjects,
        setUserObjects,
        updateMembers,
        updateTags,
        resetProject
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: ProjectProvider
};
