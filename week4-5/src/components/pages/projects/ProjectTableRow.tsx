import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";
// import * as MuiIcon from "@material-ui/icons";
// import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import TextEllipisToolTip from "components/elements/TextEllipsisTooltip";
import RouteContext from "context/RouteContext";
import AuthContext from "context/AuthContext";
import ProjectUtils from "utils/ProjectUtils";
import { annotationImages } from "const/Project";

// const useStyles = makeStyles(() => ({
//   checkboxIcon: {
//     color: '#eaeaea',
//   },
//   checkboxCheckedIcon: {
//     color: '#fdcd13',
//   },
// }));

const ProjectTableRow = (props: any) => {
  // const classes = useStyles();

  const routeInfo: any = React.useContext(RouteContext.Context);
  const authInfo: any = React.useContext(AuthContext.Context);
  const { project } = props;

  const handleClickProject = (e: any, projectId: any) => {
    e.stopPropagation();
    routeInfo.history.push(
      `/${authInfo.accountName}/project/${projectId}/overview`
    );
  };

  const getAnnotationImage = (type: any) => {
    switch (type) {
      case "Polyline":
        return annotationImages.polyline;
      case "Box":
        return annotationImages.box;
      case "Polygon":
        return annotationImages.polygonSegmentation;
      case "Keypoint":
        return annotationImages.keypoint;
      case "Image Categorization":
        return annotationImages.imageCategorization;
      default:
        return annotationImages.box;
    }
  };

  // const handleClickLike = (e) => {
  //   e.stopPropagation();
  // }

  return (
    <MUI.TableRow hover onClick={(e: any) => handleClickProject(e, project.id)}>
      {/* TODO (tsnoh->shko): 즐겨찾기 기능 추가시 사용  */}
      {/* <MUI.TableCell align="center" padding="checkbox">
        <MUI.Checkbox
          icon={<MuiIcon.Stars className={classes.checkboxIcon} />}
          checkedIcon={<MuiIcon.Stars className={classes.checkboxCheckedIcon} />}
          value={project.id}
          onClick={handleClickLike}
        />
      </MUI.TableCell> */}
      <MUI.TableCell>
        <TextEllipisToolTip text={project.name}>
          <MUI.Typography variant="subtitle2"> {project.name} </MUI.Typography>
        </TextEllipisToolTip>
      </MUI.TableCell>
      <MUI.TableCell>
        <MUI.Box display="flex">
          {_.map(
            ProjectUtils.getAnnotationTypes(project.labelInterface),
            (type, index) => (
              <MUI.Tooltip key={index} title={type}>
                <MUI.Box
                  width="24px"
                  height="24px"
                  mr={0.4}
                  bgcolor="#fff7f7"
                  borderRadius="100px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    alt={`${type} icon`}
                    width="8px"
                    src={getAnnotationImage(type)}
                  />
                </MUI.Box>
              </MUI.Tooltip>
            )
          )}
        </MUI.Box>
      </MUI.TableCell>
      <MUI.TableCell align="center">
        {project.labelCount.toLocaleString("en")}
      </MUI.TableCell>
      <MUI.TableCell align="center">
        {moment(project.createdAt).format("MMM DD, YYYY")}
      </MUI.TableCell>
      <MUI.TableCell align="center">
        {moment(project.lastUpdatedAt).fromNow()}
      </MUI.TableCell>
    </MUI.TableRow>
  );
};

export default ProjectTableRow;
