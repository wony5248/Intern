import React from "react";
import { useSnackbar } from "notistack";
import NotificationsUtils from "utils/NotificationsUtils";

const Context = React.createContext<any | undefined>(undefined);

const NotificationsProvider = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { children } = props;
  const [isActive, setIsActive]: any = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [newNotification, setNewNotification] = React.useState(null);

  React.useEffect(() => {
    if (!newNotification) return;
    const nextNotifications = notifications.slice();
    nextNotifications.unshift(newNotification);
    setNotifications(nextNotifications);

    setUnreadCount(unreadCount + 1);
    enqueueSnackbar(NotificationsUtils.getMessageOnSnackbar(newNotification), {
      variant: "info"
    });
    // eslint-disable-next-line
  }, [newNotification]);

  return (
    <Context.Provider
      value={{
        isActive,
        setIsActive,
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        newNotification,
        setNewNotification
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: NotificationsProvider
};
