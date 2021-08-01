import React from "react";
import _ from "lodash";
import * as MUI from "@material-ui/core";
import * as MuiIcon from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Theme from "assets/theme/Theme";
import AuthContext from "context/AuthContext";
import RouteContext from "context/RouteContext";
import NotificationsContext from "context/NotificationsContext";
// import Notifications from "components/elements/notifications";
import DropDownMenu from "components/elements/DropDownMenu";
import UserAvatar from "components/elements/UserAvatar";

const useStyles = makeStyles((theme: any) => ({
  appBar: {
    backgroundColor: theme.palette.navy.main
  },
  toolBar: {
    paddingTop: "20px",
    "& .MuiIconButton-root:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    "@media (min-width: 0px)": {
      width: "1000px"
    },
    "@media (min-width: 1000px)": {
      width: "100%"
    },
    "@media (min-width:1200px)": {
      width: "1210px",
      margin: "0 auto"
    }
  },
  tabs: {
    "& .MuiTabs-flexContainer": {
      height: "63px"
    }
  },
  tab: {
    minWidth: "100px"
  },
  avatar: {
    marginRight: "10px"
  },
  logoMenu: {
    cursor: "pointer"
  },
  labelingButton: {
    borderRadius: "100px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontSize: "12px",
    marginRight: "50px"
  },
  textAvatar: {
    color: "#ffffff",
    backgroundColor: "transparent ",
    border: "solid 1px #ffffff",
    width: "20px",
    height: "20px",
    fontSize: "13px",
    marginLeft: "30px",
    marginRight: "10px"
  }
}));

const NavbarLayout = (props: any) => {
  const classes = useStyles();

  const authInfo: any = React.useContext(AuthContext.Context);
  const notificationsInfo: any = React.useContext(NotificationsContext.Context);
  const routeInfo: any = React.useContext(RouteContext.Context);
  const {
    children,
    tabs,
    tabIndex,
    onClickTab,
    hasLabelingButton,
    projectId
  } = props;

  const getComponent = (key: any) => {
    return React.Children.toArray(children).filter(
      (comp: any) => comp.key === key
    );
  };

  const handleClickStartLabeling = (e: any) => {
    e.stopPropagation();
    window.open(
      `https://${
        process.env.REACT_APP_WORK_HOST
      }/${projectId}?accessToken=${localStorage.getItem(
        "spb_access"
      )}&idToken=${localStorage.getItem(
        "spb_user"
      )}&refreshToken=${localStorage.getItem("spb_")}`
    );
  };

  const handleClickLogo = () => {
    routeInfo.history.push("/");
  };

  // const handleClickNotificationIcon = () => {
  //   notificationsInfo.setIsActive(!notificationsInfo.isActive);
  // };

  // const handleClickAwayOnNotifications = () => {
  //   notificationsInfo.setIsActive(false);
  // };

  const handleClickSupport = () => {
    window.open(
      "https://www.notion.so/superbai/Superb-AI-Official-7ad368b8483f415f80254868229d1940"
    );
  };

  const handleClickMyAccount = () => {
    routeInfo.history.push(`/${authInfo.accountName}/my_account`);
  };

  const handleClickLogout = () => {
    authInfo.logout();
  };

  return (
    <MUI.Box minHeight="100vh" position="relative">
      <MUI.AppBar className={classes.appBar}>
        <MUI.Toolbar className={classes.toolBar}>
          <MUI.Grid container alignItems="center" spacing={1}>
            <MUI.Grid item xs={2}>
              <MUI.Box display="flex" alignItems="center">
                <MUI.Box
                  className={classes.logoMenu}
                  display="flex"
                  alignItems="center"
                  onClick={handleClickLogo}
                >
                  <MUI.Avatar
                    src="../static/image/logo_small_t.png"
                    alt="logo"
                    className={classes.avatar}
                  />
                  {getComponent(".$title")}
                </MUI.Box>
                {getComponent(".$titleButton")}
              </MUI.Box>
            </MUI.Grid>
            <MUI.Grid item xs={5}>
              <MUI.Tabs
                value={tabIndex}
                onChange={onClickTab}
                indicatorColor="primary"
                className={classes.tabs}
              >
                {_.map(tabs, tab => (
                  <MUI.Tab
                    key={tab}
                    disableRipple
                    className={classes.tab}
                    label={_.startCase(tab)}
                  />
                ))}
              </MUI.Tabs>
            </MUI.Grid>
            <MUI.Grid item xs={5}>
              <MUI.Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                {hasLabelingButton && (
                  <MUI.Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.labelingButton}
                    onClick={handleClickStartLabeling}
                  >
                    START LABELING
                  </MUI.Button>
                )}

                <MUI.Box position="relative">
                  <MUI.IconButton
                    color="inherit"
                    size="small"
                    // onClick={handleClickNotificationIcon}
                  >
                    <MUI.Badge
                      // badgeContent={notificationsInfo.unreadCount}
                      color="secondary"
                    >
                      <MuiIcon.Notifications />
                    </MUI.Badge>
                  </MUI.IconButton>
                  {/* <Notifications /> */}
                </MUI.Box>

                <UserAvatar
                  className={classes.textAvatar}
                  userInfo={authInfo}
                />
                <MUI.Typography>{authInfo.name}</MUI.Typography>
                <DropDownMenu chevronDownIcon="white" navBar>
                  <MUI.Box key="popper">
                    <MUI.MenuItem onClick={handleClickSupport}>
                      Support
                    </MUI.MenuItem>
                    <MUI.MenuItem onClick={handleClickMyAccount}>
                      My Account
                    </MUI.MenuItem>
                    <MUI.MenuItem onClick={handleClickLogout}>
                      Log out
                    </MUI.MenuItem>
                  </MUI.Box>
                </DropDownMenu>
              </MUI.Box>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.Toolbar>
      </MUI.AppBar>
      <MUI.Box pt="105px" pb="50px" m="0 auto" width="1210px">
        <MUI.Grid container spacing={2} direction="column">
          <MUI.Grid item xs={12}>
            {getComponent(".$breadscrumb")}
          </MUI.Grid>
          <MUI.Grid item xs={12}>
            {getComponent(".$children")}
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>
    </MUI.Box>
  );
};

export default NavbarLayout;
