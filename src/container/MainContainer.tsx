import React from "react";
import { LinearProgress } from "@material-ui/core";

import AuthContext from "context/AuthContext";
import NotificationsService from "services/NotificationsService";
import NotificationsContext from "context/NotificationsContext";
import SocketService from "services/SocketService";
import ServiceUtils from "utils/ServiceUtils";
import RouteContext from "context/RouteContext";
import ProjectsContext from "context/ProjectsContext";

const MainDetailContainer = (props: any) => {
  const { children } = props;

  const authInfo = React.useContext(AuthContext.Context);
  const { accountName, email } = authInfo;

  const notificationsInfo = React.useContext(NotificationsContext.Context);
  //   const {
  //     setNotifications,
  //     setUnreadCount,
  //     setNewNotification
  //   } = notificationsInfo;

  //   const socketInfo = React.useContext(SocketContext.Context);
  //   const { setSocket } = socketInfo;

  const routeInfo: any = React.useContext(RouteContext.Context);
  const projectsInfo = React.useContext(ProjectsContext.Context);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const res = await NotificationsService.getNotifications(Date.now());
        const { noti, unread } = res;

        // setNotifications(noti || []);

        // setUnreadCount(unread || 0);
        const socket = SocketService.connect();
        // setSocket(socket);
        SocketService.subscribe(socket, accountName, email);
        // socket.on("message", (msg: any) => {
        //  setNewNotification(ServiceUtils.toCamelCaseKeys(JSON.parse(msg)));
        // });
      } catch (err) {}
    })();

    (async () => {
      try {
        // TODO (tsnoh): role
        // tslint:disable-next-line: quotemark
        if (authInfo.role !== "collaborator") {
          await Promise.all([
            projectsInfo.updateProjects(),
            projectsInfo.updateMembers()
          ]);
        } else {
          projectsInfo.updateProjects();
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    })();

    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    // if (notificationsInfo.isActive) notificationsInfo.setIsActive(false);
    // eslint-disable-next-line
  }, [routeInfo.history.location]);

  if (isLoading) return <LinearProgress />;

  return (
    <>
      {children}
      {/* <ToastContainer /> */}
    </>
  );
};

export default MainDetailContainer;
