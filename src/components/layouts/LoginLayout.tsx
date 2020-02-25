import React from "react";
import * as MUI from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    logoBox: {
      marginBottom: "15px"
    },
    logoText: {
      fontSize: "30px",
      color: "#ff625a"
      // fontWeight: '500'
    },
    containerBox: {
      padding: "50px",
      background: "#fff",
      borderRadius: "6px",
      minWidth: "400px",
      maxWidth: "400px",
      display: "flex",
      flexDirection: "column"
    }
  })
);

const LoginLayout: React.FC = props => {
  const classes = useStyles();
  return (
    <MUI.Box className={classes.box}>
      <MUI.Box className={classes.logoBox}>
        <img
          width="180px"
          src="https://asset.superb-ai.com/assets/img/new_logo.png"
          alt="logo"
        />
      </MUI.Box>
      <MUI.Box className={classes.containerBox} boxShadow={1}>
        {props.children}
      </MUI.Box>
    </MUI.Box>
  );
};

export default LoginLayout;
