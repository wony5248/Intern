import React from "react";
import * as RouterDOM from "react-router-dom";

import AuthContext from "context/AuthContext";

const PrivateRoute: any = (props: any) => {
  const authInfo: any = React.useContext(AuthContext.Context);
  const { component: InnerComponent, ...rest } = props;

  return (
    <RouterDOM.Route
      {...rest}
      render={innerProps =>
        authInfo.accountName &&
        authInfo.email &&
        authInfo.name &&
        authInfo.role &&
        authInfo.tier ? (
          <InnerComponent {...innerProps} />
        ) : (
          <RouterDOM.Redirect
            to={{
              pathname: "/auth/login",
              state: { from: innerProps.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
