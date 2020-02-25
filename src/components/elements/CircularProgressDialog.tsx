import React from "react";
import * as MUI from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    circularDialog: {
      "& .MuiPaper-root": {
        boxShadow: "none",
        backgroundColor: "transparent",
        overflow: "hidden",
        scroll: "none"
      }
    }
  })
);
type CircularProgressProps = {
  isLoading: boolean;
};
const CircularProgressDialog: React.FC<CircularProgressProps> = props => {
  const classes = useStyles();
  const { isLoading } = props;

  return (
    <MUI.Dialog className={classes.circularDialog} open={isLoading}>
      <MUI.CircularProgress />
    </MUI.Dialog>
  );
};

export default CircularProgressDialog;
