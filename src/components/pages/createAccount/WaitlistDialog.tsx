import React from "react";
import * as MUI from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ReconfirmDialog from "components/elements/ReconfirmDialog";
import WaitlistService from "services/WaitlistService";
import CircularProgressBox from "components/elements/CircularProgressBox";
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
interface AccountProps {
  isDialogOpen: any;
  setIsDialogOpen: any;
  fullName: string;
  email: string;
  setAccountName: any;
  setAffiliation: any;
  setFirstName: any;
  setLastName: any;
  setEmail: any;
  setPassword: any;
  setConfirmPassword: any;
}
const CreateAccount: React.SFC<AccountProps> = (props: any) => {
  const {
    isDialogOpen,
    setIsDialogOpen,
    fullName,
    email,
    setAccountName,
    setAffiliation,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword
  } = props;
  const [isLoading, setIsLoading]: any = React.useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen]: any = React.useState(false);
  const [isThankYouDialogOpen, setIsThankYouDialogOpen]: any = React.useState(
    false
  );

  const handleCloseDialog = () => {
    setAccountName("");
    setAffiliation("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsDialogOpen(false);
  };

  const handleClickSignUpToWaitlist: any = async () => {
    try {
      setIsLoading(true);
      await WaitlistService.registerToWaitingList(fullName, email);

      window.analytics.track("submit_waitlist", {
        category: "account",
        label: email
      });

      setIsLoading(false);
      setIsThankYouDialogOpen(true);
    } catch (err) {
      setIsLoading(false);
      setIsErrorDialogOpen(err.message);
    }
  };
  const classes = useStyles();
  if (isLoading) {
    return (
      <MUI.Dialog className={classes.circularDialog} open={isLoading}>
        <CircularProgressBox boxProps={{ height: "100px" }} />
      </MUI.Dialog>
    );
  }

  if (isThankYouDialogOpen) {
    return (
      <ReconfirmDialog
        hasCancelButton={false}
        title={`Hi, ${fullName}`}
        message="Thank you for signing up to our waitlist. We will be in touch shortly!"
        isDialogOpen={isDialogOpen}
        onClickConfirm={handleCloseDialog}
      />
    );
  }

  if (isErrorDialogOpen) {
    return (
      <ReconfirmDialog
        hasCancelButton={false}
        variant="error"
        message={isErrorDialogOpen}
        isDialogOpen={isDialogOpen}
        onClickConfirm={handleCloseDialog}
      />
    );
  }

  return (
    <ReconfirmDialog
      variant="warning"
      message="Only invited users can create an account at the moment. Please sign up to our waitlist."
      isDialogOpen={isDialogOpen}
      confirmButtonMessage="Sign up to waitlist"
      onClickConfirm={handleClickSignUpToWaitlist}
      onClickCancel={handleCloseDialog}
    />
  );
};

export default CreateAccount;
