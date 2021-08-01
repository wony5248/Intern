import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";

import RouteContext from "context/RouteContext";
import AuthService from "services/AuthService";
import ReconfirmDialog from "components/elements/ReconfirmDialog";

const CreateAccountCheckEmail = () => {
  const routeInfo: any = React.useContext<any>(RouteContext.Context);
  const { tenantId, email } = routeInfo.params;
  const [isDialogOpen, setIsDialogOpen]: any = React.useState(false);

  React.useEffect(() => {
    if (!tenantId || !email) {
      routeInfo.history.push("/auth/login");
    }
    // eslint-disable-next-line
  }, []);

  const handleClickResendCode = async () => {
    try {
      await AuthService.resendCode(atob(tenantId), atob(email));
      setIsDialogOpen("success");
    } catch (err) {
      setIsDialogOpen(err.message);
    }
  };

  return (
    <LoginLayout>
      <MUI.Box width="300px" m="0 auto">
        <MUI.Typography variant="h3">Check your email </MUI.Typography>
        <MUI.Box mt="20px" />
        <MUI.Typography variant="subtitle2">
          Thanks for signing up.
        </MUI.Typography>
        <MUI.Typography variant="subtitle2">
          We’ve sent you an email with an activation link.
        </MUI.Typography>
        <MUI.Typography variant="subtitle2">
          Please activate your account within 24 hours.
        </MUI.Typography>
        <MUI.Box display="flex">
          <MUI.Typography variant="subtitle1">(Sent to:</MUI.Typography>
          <MUI.Typography variant="subtitle1" style={{ fontWeight: 500 }}>
            &nbsp;{atob(routeInfo.params.email)}
          </MUI.Typography>
          <MUI.Typography variant="subtitle1">)</MUI.Typography>
        </MUI.Box>
        <MUI.Box mt="20px" />
        <MUI.Link
          variant="body1"
          color="textSecondary"
          onClick={handleClickResendCode}
        >
          Click here to resend account activation link.
        </MUI.Link>
      </MUI.Box>
      <ReconfirmDialog
        hasCancelButton={false}
        isDialogOpen={!!isDialogOpen}
        variant={isDialogOpen === "success" ? "success" : "error"}
        message={
          isDialogOpen === "success"
            ? "We’ve sent you an email with an activation link. Please activate your account within 24 hours."
            : isDialogOpen
        }
        confirmButtonMessage="OK"
        onClickConfirm={() => setIsDialogOpen(false)}
      />
    </LoginLayout>
  );
};

export default CreateAccountCheckEmail;
