import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import RouteContext from "context/RouteContext";

const CreateAccountAlreadyActivated = () => {
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
        Account is already activated.
      </MUI.Typography>
    </LoginLayout>
  );
};

export default CreateAccountAlreadyActivated;
