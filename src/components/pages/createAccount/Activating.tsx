import React from "react";
import _ from "lodash";
import CircularProgressDialog from "components/elements/CircularProgressDialog";
import AuthService from "services/AuthService";
import RouteContext from "context/RouteContext";

const Activating = () => {
  const routeInfo: any = React.useContext(RouteContext.Context);

  const { tenantId, email, code } = routeInfo.params;

  React.useEffect(() => {
    if (!tenantId || !email || !code) {
      routeInfo.history.push("/auth/login");
      return;
    }
    AuthService.confirmAccount({
      tenantId: atob(tenantId),
      email: atob(email),
      code
    })
      .then(() => {
        routeInfo.history.replace(
          `/auth/welcome?tenantId=${tenantId}&email=${email}`
        );
      })
      .catch((err: any) => {
        const errCode = _.toString(_.get(err.response, "data.code", "200400"));

        switch (errCode) {
          case "201412": // Already Activated
            routeInfo.history.replace(`/auth/already_activated?code=${code}`);
            break;
          case "200412": // Invalid Account Status
            routeInfo.history.replace(`/auth/invalid_account?code=${code}`);
            break;
          case "201404": // Invalid User Status
            routeInfo.history.replace(`/auth/invalid_user?code=${code}`);
            break;
          case "012400": // Expired Code Exeption
            routeInfo.history.replace(
              `/auth/expired?tenantId=${tenantId}&email=${email}&code=${code}`
            );
            break;
          default:
            routeInfo.history.replace(`/something_went_wrong`);
        }
      });
    // eslint-disable-next-line
  }, []);

  return <CircularProgressDialog isLoading={true} />;
};

export default Activating;
