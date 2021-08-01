import * as React from "react";
import * as RouterDOM from "react-router-dom";
import PrivateRoute from "components/auth/PrivateRoute";
import AuthContext from "context/AuthContext";
import ProjectsContext from "context/ProjectsContext";
import AssetsContext from "context/AssetsContext";
import AccountDetail from "./AccountDetailRoute";
import MainContainer from "container/MainContainer";

const Main = ({ match }: any) => {
  const authInfo = React.useContext(AuthContext.Context);

  return (
    <AssetsContext.Provider>
      <ProjectsContext.Provider>
        <MainContainer match={match}>
          <RouterDOM.Switch>
            <PrivateRoute
              path={`/${authInfo.accountName}`}
              component={AccountDetail}
            />
            <RouterDOM.Redirect to={`/${authInfo.accountName}`} />
          </RouterDOM.Switch>
        </MainContainer>
      </ProjectsContext.Provider>
    </AssetsContext.Provider>
  );
};
Main.url = "/:accountName";

export default Main;
