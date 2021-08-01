import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import ProjectsContext from "context/ProjectsContext";
import RouteContext from "context/RouteContext";
import ProjectTableRow from "./ProjectTableRow";
import TablePagination from "components/elements/TablePagination";
import AuthContext from "context/AuthContext";
import UserRoleUtils from "utils/UserRoleUtils";
import CircularProgressBox from "components/elements/CircularProgressBox";

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: "SofiaProRegular"
  },
  tableHead: {
    boxShadow: "none",
    "& .MuiTableCell-root": {
      borderBottom: "solid 1px #979797",
      textTransform: "uppercase",
      fontSize: "10px"
    }
  },
  noSelectedRow: {
    height: "100px",
    "& td": {
      fontSize: "13px",
      textAlign: "center"
    },
    "& a": {
      color: "#ff625a"
    },
    "& a:hover": {
      textDecoration: "none"
    }
  },
  checkboxIcon: {
    color: "#eaeaea"
  },
  checkboxCheckecIcon: {
    color: "#fdcd13"
  },
  chip: {
    margin: "3px",
    fontSize: "11px"
  },
  newProjectButton: {
    backgroundColor: "#ff9772",
    borderRadius: "100px",
    fontSize: "12px",
    lineHeight: 1,
    padding: "8px 16px",
    "& svg": {
      marginRight: "4px"
    }
  }
}));

const Layout = (props: any) => {
  const classes = useStyles();

  const projectsInfo = React.useContext(ProjectsContext.Context);
  const routeInfo: any = React.useContext(RouteContext.Context);
  const authInfo: any = React.useContext(AuthContext.Context);
  const { role } = authInfo;
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickNewProjectButton = () => {
    routeInfo.history.push({
      pathname: `/${authInfo.accountName}/new_project`,
      state: { prevPath: routeInfo.history.location.pathname }
    });
  };

  React.useEffect(() => {
    if (!projectsInfo) return;

    (async () => {
      setIsLoading(true);
      await projectsInfo.updateProjects(routeInfo.params);
      setIsLoading(false);
    })();

    // eslint-disable-next-line
  }, [routeInfo.params]);

  return (
    <MUI.Box width="950px" mt="30px" mr="auto" ml="auto">
      <MUI.Grid container spacing={3} direction="column">
        <MUI.Grid item xs={12}>
          <MUI.Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MUI.Typography variant="h1" className={classes.title}>
              My Projects
            </MUI.Typography>
            {UserRoleUtils.isOwnerOrAdmin(role) && (
              <MUI.Button
                className={classes.newProjectButton}
                variant="contained"
                color="primary"
                onClick={handleClickNewProjectButton}
              >
                <Icon
                  path={mdiPlus}
                  //   className={classes.downloadIcon}
                  size="15px"
                  color="#fff"
                />{" "}
                NEW PROJECT
              </MUI.Button>
            )}
          </MUI.Box>
        </MUI.Grid>
        <MUI.Grid item xs={12}>
          <MUI.Table>
            <colgroup>
              <col width="250" />
              <col width="280" />
              <col width="149" />
              <col width="140" />
              <col width="140" />
            </colgroup>
            <MUI.TableHead className={classes.tableHead}>
              <MUI.TableRow>
                {/* <MUI.TableCell padding="checkbox"></MUI.TableCell> */}
                <MUI.TableCell>Project Name</MUI.TableCell>
                <MUI.TableCell>Annotation Type</MUI.TableCell>
                <MUI.TableCell align="center">Label Count</MUI.TableCell>
                <MUI.TableCell align="center">Created Date</MUI.TableCell>
                <MUI.TableCell align="center">Last Update</MUI.TableCell>
              </MUI.TableRow>
            </MUI.TableHead>
            {!isLoading &&
              (_.isEmpty(projectsInfo.projects) ? (
                <MUI.TableBody>
                  <MUI.TableRow className={classes.noSelectedRow}>
                    <MUI.TableCell colSpan={8}>
                      <MUI.Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <MUI.Typography variant="body2">
                          You don't have any projects at the moment.
                        </MUI.Typography>
                      </MUI.Box>
                    </MUI.TableCell>
                  </MUI.TableRow>
                </MUI.TableBody>
              ) : (
                <MUI.TableBody>
                  {_.map(projectsInfo.projects, project => (
                    <ProjectTableRow key={project.id} project={project} />
                  ))}
                </MUI.TableBody>
              ))}
          </MUI.Table>
          {isLoading && (
            <CircularProgressBox
              boxProps={{
                width: "950px",
                display: "flex",
                justifyContent: "center",
                mt: "50px"
              }}
            />
          )}
        </MUI.Grid>
        <MUI.Grid item xs={12}>
          <TablePagination totalCount={projectsInfo.totalCount} />
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Box>
  );
};

export default Layout;
