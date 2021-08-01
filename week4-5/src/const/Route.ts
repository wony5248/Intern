const route = (accountName: string, projectId: string) => ({
  accountRoot: `/${accountName}`,
  projectRoot: `/${accountName}/project/${projectId}`
});

export default route;
