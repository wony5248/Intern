import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavbarLayout from "components/layouts/NavbarLayout";
import RouteContext from "context/RouteContext";
import SearchBar from "components/pages/label/SearchBar";
import AuthContext from "context/AuthContext";
import UserRoleUtils from "utils/UserRoleUtils";

const useStyles = makeStyles(theme => ({
  uploadButton: {
    marginRight: "10px",
    paddingRight: "15px",
    paddingLeft: "15px",
    fontSize: "11px",
    boxShadow: theme.shadows[2]
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}));

const AccountDetailContainer = (props: any) => {
  const classes = useStyles();
  const authInfo: any = React.useContext(AuthContext.Context);
  const routeInfo: any = React.useContext(RouteContext.Context);
  const {
    params,
    history: {
      push,
      location: { pathname }
    }
  } = routeInfo;

  const { children } = props;

  const [isLoading, setIsLoading] = React.useState(true);
  const [tabIndex, setTabIndex] = React.useState(0);

  const pathNameArray = _.split(pathname, "/");
  const path = pathNameArray[2];
  const dataPageBreadscrumb = `Dataset: ${params.dataset}, Project: ${params.project}`;
  const isDataView = path === "data_list" && params.dataset;
  const isUploadView = pathNameArray[pathNameArray.length - 1] === "upload";

  React.useEffect(() => {
    setIsLoading(true);
    setTabIndex(getTabIndex(path));
    setIsLoading(false);

  // tslint:disable-next-line: align
  }, [path, isUploadView]);

  const handleClickTab = (e: any, value: any) => {
    let route = "project_list";
    if (UserRoleUtils.isCollaborator(authInfo.role)) {
      switch (value) {
        case 0:
          route = "project_list";
          break;
        case 1:
          route = "my_account";
          break;
        default:
          return;
      }
    } else {
      switch (value) {
        case 0:
          route = "project_list";
          break;
        case 1:
          route = "data_list";
          break;
        case 2:
          route = "my_account";
          break;
        default:
          return;
      }
    }

    setTabIndex(value);
    push(`/${authInfo.accountName}/${route}`);
  };

  const handleClickBreadscrumb = (target: any) => (e: any) => {
    push(`/${authInfo.accountName}/${target}`);
  };

  const getTabIndex = (path: any) => {
    if (UserRoleUtils.isCollaborator(authInfo.role)) {
      switch (path) {
        case "project_list":
          return 0;
        case "my_account":
          return 1;
        default:
          return 0;
      }
    }
    switch (path) {
      case "project_list":
        return 0;
      case "data_list":
        return 1;
      case "my_account":
        return 2;
      default:
        return 0;
    }
  };

  if (isLoading) return <MUI.LinearProgress />;

  return (
    <NavbarLayout
      tabs={
        UserRoleUtils.isCollaborator(authInfo.role)
          ? ["project_list", "my_account"]
          : ["project_list", "data_list", "my_account"]
      }
      tabIndex={tabIndex}
      onClickTab={handleClickTab}
    >
      <MUI.Typography
        key="title"
        color="inherit"
        variant="subtitle2"
        className={classes.text}
      >
        {authInfo.accountName}
      </MUI.Typography>
      <MUI.Box display="flex" justifyContent="space-between" key="breadscrumb">
        {isUploadView ? (
          <MUI.Breadcrumbs separator="›" aria-label="Breadcrumb">
            <MUI.Link
              variant="body2"
              color="inherit"
              onClick={handleClickBreadscrumb("project_list")}
            >
              {authInfo.accountName}
            </MUI.Link>
            <MUI.Link
              variant="body2"
              color="inherit"
              onClick={handleClickBreadscrumb("data_list")}
            >
              {_.startCase(path)}
            </MUI.Link>
            <MUI.Typography variant="body2" color="textPrimary">
              Upload
            </MUI.Typography>
          </MUI.Breadcrumbs>
        ) : (
          <>
            {isDataView ? (
              <MUI.Breadcrumbs separator="›" aria-label="Breadcrumb">
                <MUI.Link
                  variant="body2"
                  color="inherit"
                  onClick={handleClickBreadscrumb("project_list")}
                >
                  {authInfo.accountName}
                </MUI.Link>
                <MUI.Link
                  variant="body2"
                  color="inherit"
                  onClick={handleClickBreadscrumb("data_list")}
                >
                  {_.startCase(path)}
                </MUI.Link>
                <MUI.Typography variant="body2" color="textPrimary">
                  {dataPageBreadscrumb}
                </MUI.Typography>
              </MUI.Breadcrumbs>
            ) : (
              <MUI.Breadcrumbs separator="›" aria-label="Breadcrumb">
                <MUI.Link
                  variant="body2"
                  color="inherit"
                  onClick={handleClickBreadscrumb("project_list")}
                >
                  {authInfo.accountName}
                </MUI.Link>
                <MUI.Typography variant="body2" color="textPrimary">
                  {_.startCase(path)}
                </MUI.Typography>
              </MUI.Breadcrumbs>
            )}
            {path === "data_list" && (
              <MUI.Box display="flex">
                <MUI.Button
                  className={classes.uploadButton}
                  color="primary"
                  size="small"
                  onClick={() =>
                    push(
                      `/${authInfo.accountName}/data_list/upload${
                        params.dataset ? `?dataset=${params.dataset}` : ""
                      }`
                    )
                  }
                >
                  UPLOAD DATA
                </MUI.Button>
                {_.isEmpty(params) || params.group ? (
                  <SearchBar target="dataset" />
                ) : (
                  <SearchBar target="asset" />
                )}
              </MUI.Box>
            )}
          </>
        )}
        {}
      </MUI.Box>
      <MUI.Box key="children">{children}</MUI.Box>
    </NavbarLayout>
  );
};

export default AccountDetailContainer;
