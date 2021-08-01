import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import NotificationsContext from "context/NotificationsContext";
import NotificationsService from "services/NotificationsService";
import Notification from "./Notification";
import CircularProgressBox from "components/elements/CircularProgressBox";
// const useStyles = makeStyles(() => ({
//   box: {
//     position: 'absolute',
//     top: '40px',
//     left: '-195px',
//     background: '#fff',
//     borderRadius: '7px',
//     display: 'flex',
//     flexDirection: 'column',
//     width: '400px',
//     overflow: 'hidden'
//   },
//   header: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     height: '35px',
//   },
//   markAllText: {
//     fontSize: '11px',
//     fontWeight: '500',
//     color: '#b3b3b3',
//     marginRight: '6px',
//     cursor: 'pointer',
//     padding: '1px 4px',
//     '&:hover': {
//       background: '#d1d1d1',
//       color: '#635c5c',
//       borderRadius: '6px',
//     }
//   },
//   gearIcon: {
//     color: 'grey',
//     width: '16px',
//     height: '16px',
//     marginRight: '11px',
//     cursor: 'pointer'
//   },
//   body: {
//     display: 'flex',
//     flexDirection: 'column',
//     maxHeight: '620px',
//     overflow: 'overlay',
//   }
// }));

export default (): any => {
  //   const classes = useStyles();

  const notificationsInfo: any = React.useContext(NotificationsContext.Context);
  const {
    notifications,
    setNotifications,
    unreadCount,
    setUnreadCount
  } = notificationsInfo;
  const [hasMorePage, setHasMorePage] = React.useState(true);

  if (!notificationsInfo.isActive) return null;

  const handleClickMarkAll = async () => {
    try {
      if (unreadCount <= 0) return;
      await NotificationsService.markAllAsRead();
      const nextNotifications = notifications.slice();
      for (const noti of nextNotifications) {
        if (!noti.checked) noti.checked = true;
      }
      setNotifications(nextNotifications);
      setUnreadCount(0);
    } catch (err) {}
  };

  const handleLoadMore = async () => {
    if (notifications.length === 0) {
      setHasMorePage(false);
      return;
    }
    const lastCreatedAt = _.last<any>(notifications).createdAt;
    try {
      const res = await NotificationsService.getNotifications(lastCreatedAt);
      const { noti } = res;
      if (noti.length !== 0) {
        setNotifications(_.concat(notifications, noti));
      } else {
        setHasMorePage(false);
      }
    } catch (err) {}
  };

  return (
    <MUI.Box boxShadow={1}>
      <MUI.Box>
        <MUI.Typography onClick={handleClickMarkAll}>
          Mark all as read
        </MUI.Typography>
      </MUI.Box>
      <MUI.Box>
        <InfiniteScroll
          useWindow={false}
          pageStart={1}
          hasMore={hasMorePage}
          loadMore={handleLoadMore}
          threshold={10}
          style={{ width: "100%" }}
          loader={
            <CircularProgressBox
              key={0}
              boxProps={{ mt: 2, mb: 2 }}
              circularProps={{ size: 20 }}
            />
          }
        >
          {_.map(notifications, (notification, index) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </InfiniteScroll>
      </MUI.Box>
    </MUI.Box>
  );
};
