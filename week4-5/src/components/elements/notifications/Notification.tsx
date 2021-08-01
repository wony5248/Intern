import React from "react";
import _ from "lodash";
import moment from "moment";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsContext from "context/NotificationsContext";
import NotificationsService from "services/NotificationsService";
import NotificationsUtils from "utils/NotificationsUtils";
import AuthContext from "context/AuthContext";
import RouteContext from "context/RouteContext";
import UserRoleUtils from "utils/UserRoleUtils";
import ProjectContext from "context/ProjectContext";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    alignItems: "stretch",
    color: "#635c5c",
    borderBottom: "solid 1px  #e6e6e6",
    padding: "14px 0px",
    cursor: "pointer",
    "&:nth-child(1)": {
      borderTop: "solid 1px #e6e6e6"
    },
    "&:nth-last-child(1)": {
      borderBottom: "none"
    },
    "&:hover": {
      background: "#FAFAFA"
    }
  },
  left: {
    display: "flex",
    justifyContent: "flex-end",
    width: "35px",
    height: "100%",
    marginRight: "10px"
  },
  emoji: {
    fontSize: "16px",
    width: "16px",
    height: "16px"
  },
  // center
  center: {
    width: "310px",
    paddingTop: "2px"
  },
  messageBox: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "2px",
    maxWidth: "310px"
  },
  messageText: {
    color: "#635c5c",
    fontSize: "12px",
    paddingRight: "3px",
    "&.bold": {
      fontWeight: "500"
    }
  },
  fromNowText: {
    fontSize: "11px",
    color: "#9b9b9b",
    marginBottom: "2px"
  },
  issueBox: {
    display: "flex"
  },
  issueLeft: {
    width: "20px",
    paddingTop: "2px"
  },
  threadNumberAvatar: {
    "&.MuiAvatar-root": {
      width: "15px",
      height: "15px",
      fontSize: "10px"
    }
  },
  issueRight: {
    width: "300px",
    display: "flex",
    flexDirection: "column"
  },
  issueRightText: {
    maxWidth: "280px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    color: "#635c5c",
    fontSize: "12px",

    "&.first": {},
    "&.name": {
      color: "#9b9b9b",
      fontSize: "9px"
    },
    "&.reply": {
      textDecoration: "underline"
    }
  },
  // right
  right: {
    display: "flex",
    flexDirection: "column",
    width: "35px",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  newTextBox: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  circle: {
    background: "#ff9772",
    borderRadius: "50%",
    width: "4px",
    height: "4px",
    marginRight: "3px"
  },
  newText: {
    fontSize: "11px",
    color: "#ff9772"
  },
  //
  subType: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "7.5px",
    padding: "0px 8px",
    fontSize: "10px",
    "&.started": {
      color: "#a6a6a6",
      background: "#f4f4f4"
    },
    "&.succeed": {
      color: "#a3eb57",
      background: "#EDFBDD"
    },
    "&.failed": {
      color: "#ffcc00",
      background: "#fff8e0"
    },
    "&.canceled": {
      color: "#ff625a",
      background: "#ffeceb"
    }
  }
}));

const Notification = (props: any) => {
  const classes = useStyles();

  const authInfo: any = React.useContext(AuthContext.Context);

  const routeInfo: any = React.useContext(RouteContext.Context);
  const notificationsInfo: any = React.useContext(NotificationsContext.Context);
  const projectInfo: any = React.useContext(ProjectContext.Context);
  const { unreadCount, setUnreadCount } = notificationsInfo;

  const {
    notification,
    notification: {
      id,
      type,
      checked,
      payload: {
        createdAt,
        projectId,
        fromFirstName,
        labelId,
        threadId,
        threadNumber,
        commentId,
        labelName,
        projectName,
        labelCount,
        firstComment,
        replyComment,
        threadColor,
        subType,
        exportSeqNum
      }
    }
  } = props;

  const handleClickNotification = async () => {
    if (!checked) {
      await NotificationsService.readNotification([id]);
      notification.checked = true;
      setUnreadCount(unreadCount - 1);
    }

    let pathname, hash, searchParams;

    pathname = `/${authInfo.accountName}/project/${projectId}`;

    switch (type) {
      case "invite":
        routeInfo.history.push(pathname);
        break;
      case "assign":
        if (UserRoleUtils.isWorker(authInfo.role)) {
          pathname = pathname + "/label_list";
          routeInfo.history.push(pathname);
        } else {
          searchParams = new URLSearchParams({
            status: "is any one of,in progress",
            assignee: `is any one of, ${fromFirstName} (${authInfo.email})`
          });
          pathname = pathname + "/label_list?" + searchParams.toString();
          routeInfo.history.push(pathname);
        }
        break;
      case "thread":
        searchParams = new URLSearchParams({
          dataKey: labelName
        });
        pathname = pathname + "/label_list?" + searchParams.toString();
        hash = `#label_id=${labelId}&thread_id=${threadId}`;
        routeInfo.history.push(`${pathname}${hash}`);
        projectInfo.resetProject();
        break;
      case "comment":
        searchParams = new URLSearchParams({
          dataKey: labelName
        });
        pathname = pathname + "/label_list?" + searchParams.toString();
        hash = `#label_id=${labelId}&thread_id=${threadId}&comment_id=${commentId}`;
        routeInfo.history.push(`${pathname}${hash}`);
        projectInfo.resetProject();
        break;
      case "export":
        routeInfo.history.push(`${pathname}/settings#export_history`);
        break;
      default:
        break;
    }
  };

  const getEmoji = () => {
    let emoji;
    switch (type) {
      case "invite":
        emoji = "🎉";
        break;
      case "assign":
        emoji = "👉";
        break;
      case "thread":
        emoji = "🗒";
        break;
      case "comment":
        emoji = "💬";
        break;
      case "export":
        emoji = "🚀";
        break;
      default:
        break;
    }

    return <MUI.Typography className={classes.emoji}>{emoji}</MUI.Typography>;
  };

  const getMessage = () => {
    switch (type) {
      case "invite":
        return (
          <MUI.Box className={classes.messageBox}>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {fromFirstName}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              invited
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>you</MUI.Typography>
            <MUI.Typography className={classes.messageText}>to</MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {projectName}{" "}
            </MUI.Typography>
          </MUI.Box>
        );
      case "assign":
        return (
          <MUI.Box className={classes.messageBox}>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {fromFirstName}{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              assigned{" "}
            </MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {`${labelCount.toLocaleString("en")} labels`}{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>to </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              you{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>in </MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {projectName}{" "}
            </MUI.Typography>
          </MUI.Box>
        );
      case "thread":
        return (
          <MUI.Box className={classes.messageBox}>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {fromFirstName}{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              created{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>an </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              issue{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              {" "}
              on{" "}
            </MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {labelName}{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>in </MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {projectName}{" "}
            </MUI.Typography>
          </MUI.Box>
        );
      case "comment":
        return (
          <MUI.Box className={classes.messageBox}>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {fromFirstName}{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              replied{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}> to</MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              {" "}
              an{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>
              issue{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>on</MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {labelName}{" "}
            </MUI.Typography>
            <MUI.Typography className={classes.messageText}>in </MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              {projectName}{" "}
            </MUI.Typography>
          </MUI.Box>
        );
      case "export":
        return (
          <MUI.Box className={classes.messageBox}>
            <MUI.Typography className={`${classes.messageText} bold`}>
              Export{" "}
            </MUI.Typography>
            <MUI.Typography className={`${classes.messageText} bold`}>
              #{exportSeqNum}{" "}
            </MUI.Typography>
            <MUI.Box className={`${classes.subType} ${subType}`}>
              {_.startCase(NotificationsUtils.convertExportSubType(subType))}
            </MUI.Box>
          </MUI.Box>
        );
      default:
        return null;
    }
  };

  const getCreatedAt = () => {
    if (type === "invite") return null;
    return (
      <MUI.Typography className={classes.fromNowText}>
        {moment(createdAt).fromNow()}
      </MUI.Typography>
    );
  };

  const getIssueContent = () => {
    if (type !== "thread" && type !== "comment") return null;
    return (
      <MUI.Box className={classes.issueBox}>
        <MUI.Box className={classes.issueLeft}>
          <MUI.Avatar
            className={classes.threadNumberAvatar}
            style={{ background: threadColor }}
          >
            {threadNumber}
          </MUI.Avatar>
        </MUI.Box>
        <MUI.Box className={classes.issueRight}>
          <MUI.Typography className={`${classes.issueRightText} first`}>
            {firstComment}
          </MUI.Typography>
          {type === "comment" && (
            <>
              <MUI.Typography className={`${classes.issueRightText} name`}>
                {fromFirstName} replied
              </MUI.Typography>
              <MUI.Typography className={`${classes.issueRightText} reply`}>
                {replyComment}
              </MUI.Typography>
            </>
          )}
        </MUI.Box>
      </MUI.Box>
    );
  };

  const getExportContext = () => {
    if (type !== "export") return null;
    return (
      <MUI.Box className={classes.messageBox}>
        <MUI.Typography className={`${classes.messageText} bold`}>
          {labelCount.toLocaleString("en")}{" "}
        </MUI.Typography>
        <MUI.Typography className={`${classes.messageText} bold`}>
          labels{" "}
        </MUI.Typography>
        <MUI.Typography className={classes.messageText}>in </MUI.Typography>
        <MUI.Typography className={`${classes.messageText} bold`}>
          {projectName}
        </MUI.Typography>
      </MUI.Box>
    );
  };

  return (
    <MUI.Box className={classes.box} onClick={handleClickNotification}>
      <MUI.Box className={classes.left}>{getEmoji()}</MUI.Box>
      <MUI.Box className={classes.center}>
        {getMessage()}
        {getExportContext()}
        {getCreatedAt()}
        {getIssueContent()}
      </MUI.Box>
      <MUI.Box className={classes.right}>
        {!checked && (
          <MUI.Box className={classes.newTextBox}>
            <MUI.Box className={classes.circle} />
            <MUI.Typography className={classes.newText}>New</MUI.Typography>
          </MUI.Box>
        )}
      </MUI.Box>
    </MUI.Box>
  );
};

export default Notification;
