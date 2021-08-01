import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import RouteContext from "context/RouteContext";
import AuthService from "services/AuthService";
import ReconfirmDialog from "components/elements/ReconfirmDialog";

const CreateAccountExpired = () => {
  const routeInfo: any = React.useContext(RouteContext.Context);
  const { code, email, tenantId } = routeInfo.params;
  const [isDialogOpen, setIsDialogOpen]: any = React.useState(false);

  React.useEffect(() => {
    if (!code) {
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
      <MUI.Typography variant="subtitle2" align="center">
        Activation link has expired.
      </MUI.Typography>
      {routeInfo.params.code === "201412" && (
        <MUI.Link
          variant="subtitle2"
          align="center"
          onClick={handleClickResendCode}
        >
          Click here to resend account activation link.
        </MUI.Link>
      )}
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

export default CreateAccountExpired;
