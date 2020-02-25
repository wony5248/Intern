import UserRole from "const/UserRole";

const isOwner = (accountRole:any) => {
  return accountRole === UserRole.OWNER;
}

const isOwnerOrAdmin = (accountRole:any) => {
  return accountRole !== UserRole.COLLABORATOR;
}

const isCollaborator = (accountRole:any) => {
  return accountRole === UserRole.COLLABORATOR;
}

const isManager = (projectRole:any) => {
  return projectRole === UserRole.MANAGER;
}

const isWorker = (projectRole:any) => {
  return projectRole === UserRole.WORKER;
}

const isNotWorker = (projectRole:any) => {
  return projectRole !== UserRole.WORKER;
}

export default {
  isOwner,
  isOwnerOrAdmin,
  isCollaborator,
  isManager,
  isWorker,
  isNotWorker
}