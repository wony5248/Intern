import React from "react";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textEllipsis: {
    "& .MuiTypography-root": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }
}));

const TextEllipsisTooltip = (props: any) => {
  const classes = useStyles();
  const { children, text, ...otherProps } = props;

  return (
    <MUI.Box
      {...otherProps}
      display="flex"
      alignItems="center"
      className={classes.textEllipsis}
    >
      <MUI.Tooltip title={text}>{children}</MUI.Tooltip>
    </MUI.Box>
  );
};

export default TextEllipsisTooltip;
