import React from "react";
import * as Sentry from "@sentry/browser";
import * as MUI from "@material-ui/core";
import * as MuiIcon from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";

import RouteContext from "../../../context/RouteContext";

const useStyles = makeStyles(() => ({
  rootBox: {
    width: "100%",
    height: "100%"
  },
  navBox: {
    width: "100%",
    height: "70px",
    "& img": {
      width: "104px",
      margin: "30px 0 0 60px"
    }
  },
  imageBox: {
    width: "100%",
    height: "360px",
    textAlign: "center",
    "& img": {
      width: "576px"
    }
  },
  contentsBox: {
    width: "100%",
    height: "280px",
    textAlign: "center"
  },
  footerBox: {
    width: "100%",
    height: "50px",
    position: "relative",
    textAlign: "center"
  },
  contactBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      width: "11px",
      color: "#4a4a4a"
    }
  },
  copyrightBox: {
    position: "absolute",
    top: "7px",
    right: "100px"
  },
  headerText: {
    fontSize: "38px",
    color: "#ff625a",
    fontFamily: "SofiaProRegular"
  },
  contentsText: {
    fontSize: "14px",
    color: "#4a4a4a",
    fontFamily: "SofiaProRegular"
  },
  buttonText: {
    fontSize: "14px",
    color: "#4a4a4a",
    margin: "10px",
    fontFamily: "SofiaProRegular"
  },
  contactText: {
    fontSize: "11px",
    color: "#5a7bff",
    textDecoration: "underline",
    marginLeft: "10px",
    fontFamily: "SofiaProRegular",
    cursor: "pointer"
  },
  copyrightText: {
    fontSize: "9px",
    color: "#cacaca",
    fontFamily: "SofiaProRegular"
  },
  actionButton: {
    height: "40px",
    padding: "0 20px",
    borderRadius: "7px",
    boxShadow: "0 2px 10px 0 rgba(169, 169, 169, 0.26)",
    backgroundColor: "#fff",
    "& .MuiSvgIcon-root": {
      width: "15px",
      color: "#4a4a4a"
    }
  },
  buttonGroup: {
    marginTop: "20px",
    "& button:nth-child(2)": {
      marginLeft: "10px"
    }
  }
}));

const ErrorPage = () => {
  const classes = useStyles();
  const routeInfo: any = React.useContext(RouteContext.Context);
  const idToken = localStorage.getItem("spb_user");

  let given_name: any = null;
  let email: any = null;

  if (idToken) {
    const userInfo: any = jwt_decode(idToken);
    given_name = userInfo.given_name;
    email = userInfo.email;
  }

  return (
    <>
      <MUI.Box className={classes.rootBox}>
        <MUI.Box className={classes.navBox}>
          <img
            alt="logo"
            src="https://asset.superb-ai.com/assets/img/new_logo.png"
          />
        </MUI.Box>
        <MUI.Box className={classes.imageBox}>
          <img
            alt="symbol"
            src="https://asset.superb-ai.com/suite/clip-something-went-wrong.png"
          />
        </MUI.Box>
        <MUI.Box className={classes.contentsBox}>
          <MUI.Typography className={classes.headerText}>Oops!</MUI.Typography>
          <MUI.Typography className={classes.contentsText}>
            Something went wrong there...
          </MUI.Typography>
          <MUI.Typography className={classes.contentsText}>
            We'll fix asap.
          </MUI.Typography>
          <MUI.Box className={classes.buttonGroup}>
            <MUI.Button
              className={classes.actionButton}
              onClick={() => routeInfo.history.goBack()}
            >
              <MuiIcon.ArrowBack />
              <MUI.Typography className={classes.buttonText}>
                Go back
              </MUI.Typography>
            </MUI.Button>
            <MUI.Button
              className={classes.actionButton}
              onClick={() => window.location.reload(true)}
            >
              <MuiIcon.Refresh />
              <MUI.Typography className={classes.buttonText}>
                Try again?
              </MUI.Typography>
            </MUI.Button>
          </MUI.Box>
        </MUI.Box>
        <MUI.Box className={classes.footerBox}>
          <MUI.Box className={classes.contactBox}>
            <MuiIcon.ErrorOutline />
            <MUI.Typography
              className={classes.contactText}
              onClick={() => {
                Sentry.showReportDialog({
                  user: {
                    name: given_name,
                    email: email
                  }
                });
              }}
            >
              Tell us what happened!
            </MUI.Typography>
          </MUI.Box>
          <MUI.Box className={classes.copyrightBox}>
            <MUI.Typography className={classes.copyrightText}>
              illustration by Ouch.pics
            </MUI.Typography>
          </MUI.Box>
        </MUI.Box>
      </MUI.Box>
    </>
  );
};

export default ErrorPage;
