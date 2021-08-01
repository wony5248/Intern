import React from "react";
import * as RouterDOM from "react-router-dom";
import * as HotLoader from "react-hot-loader";
import { MuiThemeProvider } from "@material-ui/core/styles";

import RouteContext from "context/RouteContext";
import AuthContext from "context/AuthContext";
import Auth from "routes/AuthRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import ErrorPage from "components/pages/error/ErrorPage";
import Main from "./routes/MainRoute";
import Theme from "assets/theme/Theme";

const ErrorPageRoute = ({ match }: any) => (
  <RouterDOM.Route path={match.path} component={ErrorPage} />
);
ErrorPageRoute.url = "/something_went_wrong";

const App = () => {
  return (
    <MuiThemeProvider theme={Theme}>
      <RouteContext.Provider>
        <AuthContext.Provider>
          <RouterDOM.BrowserRouter>
            <RouterDOM.Switch>
              <RouterDOM.Route
                exact
                path={ErrorPageRoute.url}
                component={ErrorPageRoute}
              />
              <PrivateRoute exact path="/" component={Main} />
              <RouterDOM.Route path={Auth.url} component={Auth} />
              <RouterDOM.Route path={Main.url} component={Main} />
            </RouterDOM.Switch>
          </RouterDOM.BrowserRouter>
        </AuthContext.Provider>
      </RouteContext.Provider>
    </MuiThemeProvider>
  );
};

export default HotLoader.hot(module)(App);
