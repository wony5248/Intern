import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import RouteContext from "context/RouteContext";

const CreateAccountSuccess: any = () => {
  const routeInfo: any = React.useContext(RouteContext.Context);

  const { tenantId, email } = routeInfo.params;

  React.useEffect(() => {
    const { tenantId, email } = routeInfo.params;
    if (!tenantId || !email) {
      routeInfo.history.push("/auth/login");
    }

    // eslint-disable-next-line
  }, []);

  const handleClickLogin = () => {
    routeInfo.history.push(`/auth/login?tenantId=${tenantId}&email=${email}`);
  };

  return (
    <LoginLayout>
      <MUI.Typography variant="subtitle2" align="center">
        Congratulations! Your account has been activated.
      </MUI.Typography>
      <MUI.Box margin="15px" />
      <MUI.Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickLogin}
      >
        login
      </MUI.Button>
    </LoginLayout>
  );
};

export default CreateAccountSuccess;
