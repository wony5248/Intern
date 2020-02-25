import * as React from "react";
import * as RouterDOM from "react-router-dom";
import Login from "components/pages/login";
import JoinAccount from "components/pages/joinAccount/JoinAccount";
import CreateAccount from "components/pages/createAccount";
import NotificationBoard from "components/pages/notificationBoard";

const LoginRoute = ({ match }: any) => (
  <RouterDOM.Route path={match.path} component={Login} />
);
LoginRoute.url = "/login";

const CreateAccountRoute = ({ match }: any) => (
  <RouterDOM.Route path={match.path} component={CreateAccount} />
);
CreateAccountRoute.url = "/create";

const JoinAccountRoute = ({ match }: any) => (
  <RouterDOM.Route path={match.path} component={JoinAccount} />
);
JoinAccountRoute.url = "/join";

const CreateAccountSuccessRoute = ({ match }: any) => (
  <RouterDOM.Route path={match.path} component={NotificationBoard} />
);
CreateAccountSuccessRoute.url = "/welcome";

const Auth = ({ match }: any) => (
  <RouterDOM.Switch>
    <RouterDOM.Route
      exact
      path={`${match.path}${LoginRoute.url}`}
      component={LoginRoute}
    />
    <RouterDOM.Route
      exact
      path={`${match.path}${JoinAccountRoute.url}`}
      component={JoinAccountRoute}
    />
    <RouterDOM.Route
      exact
      path={`${match.path}${CreateAccountRoute.url}`}
      component={CreateAccountRoute}
    />
    <RouterDOM.Route
      exact
      path={`${match.path}${CreateAccountSuccessRoute.url}`}
      component={CreateAccountSuccessRoute}
    />
    <RouterDOM.Redirect to={`${match.path}${LoginRoute.url}`} />
  </RouterDOM.Switch>
);
Auth.url = "/auth";

export default Auth;
