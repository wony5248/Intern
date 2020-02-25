import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";

const PasswordChangeSuccess = () => {
  return (
    <LoginLayout>
      <MUI.Typography variant="subtitle2" align="center">
        Your password has been changed.
      </MUI.Typography>
      <MUI.Link variant="subtitle2" align="center" href="/auth/login">
        Click here to log in to your account.
      </MUI.Link>
    </LoginLayout>
  );
};

export default PasswordChangeSuccess;
