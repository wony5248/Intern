import React from "react";
import * as MUI from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@mdi/react";
import {
  mdiAlertCircleOutline,
  mdiCheckCircleOutline,
  mdiCloseCircleOutline
} from "@mdi/js";

const useStyles = makeStyles(() => ({
  dialogAction: {
    paddingTop: "10px"
  }
}));
interface ReconfirmDialogProps {
  variant?: any;
  title?: any;
  message?: any;
  isDialogOpen?: any;
  confirmButtonMessage?: any;
  cancelButtonMessage?: any;
  confirmButtonVariant?: any;
  onClickConfirm?: any;
  onClickCancel?: any;
  hasCancelButton?: any;
}
const ReconfirmDialog: React.SFC<ReconfirmDialogProps> = props => {
  const classes = useStyles();
  const theme = MUI.useTheme();

  const {
    children,
    variant,
    title,
    message,
    isDialogOpen,
    confirmButtonMessage,
    cancelButtonMessage,
    confirmButtonVariant,
    onClickConfirm,
    onClickCancel,
    hasCancelButton = true
  } = props;

  const getDialogIcon = () => {
    switch (variant) {
      case "success":
        return (
          <Icon
            path={mdiCheckCircleOutline}
            color={theme.palette.primary.main}
            size="40px"
          />
        );
      case "error":
        return (
          <Icon
            path={mdiCloseCircleOutline}
            color={theme.palette.primary.main}
            size="40px"
          />
        );
      case "warning":
        return (
          <Icon
            path={mdiAlertCircleOutline}
            color={theme.palette.primary.main}
            size="40px"
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <MUI.Dialog
      fullWidth
      transitionDuration={0}
      maxWidth="xs"
      open={isDialogOpen}
    >
      <MUI.DialogTitle>
        {getDialogIcon()}
        <MUI.Typography>{title}</MUI.Typography>
      </MUI.DialogTitle>
      <MUI.DialogContent>
        <MUI.Box pb="20px" textAlign="center">
          {message ? (
            <MUI.Typography variant="subtitle1">{message}</MUI.Typography>
          ) : (
            children
          )}
        </MUI.Box>
      </MUI.DialogContent>
      <MUI.DialogActions className={classes.dialogAction}>
        <MUI.Button
          size="small"
          color="primary"
          variant={confirmButtonVariant ? confirmButtonVariant : "contained"}
          onClick={onClickConfirm}
        >
          {confirmButtonMessage ? confirmButtonMessage : "Confirm"}
        </MUI.Button>
        {hasCancelButton && (
          <MUI.Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={onClickCancel}
          >
            {cancelButtonMessage ? cancelButtonMessage : "Cancel"}
          </MUI.Button>
        )}
      </MUI.DialogActions>
    </MUI.Dialog>
  );
};

export default ReconfirmDialog;
