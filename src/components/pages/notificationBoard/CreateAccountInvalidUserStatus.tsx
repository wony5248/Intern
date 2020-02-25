import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import RouteContext from "context/RouteContext";

const CreateAccountInvalidUserStatus = () => {
  const routeInfo: any = React.useContext(RouteContext.Context);

  React.useEffect(() => {
    const { code } = routeInfo.params;
    if (!code) {
      routeInfo.history.push("/auth/login");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <LoginLayout>
      <MUI.Typography variant="subtitle2" align="center">
        User is invalid.
      </MUI.Typography>
      <MUI.Typography variant="subtitle2" align="center">
        Please contact us at <MUI.Link>support@superb-ai.com</MUI.Link>
      </MUI.Typography>
    </LoginLayout>
  );
};

export default CreateAccountInvalidUserStatus;
