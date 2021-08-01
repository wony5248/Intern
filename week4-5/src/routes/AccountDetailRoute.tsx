import * as React from "react";
import * as RouterDOM from "react-router-dom";
import Projects from "components/pages/projects";
import AccountDetailContainer from "container/AccountDetailContainer";

// tslint:disable-next-line: variable-name
const ProjectsRoute = ({ match }: any) => (
  <RouterDOM.Route path={match.path} component={Projects} />
);
ProjectsRoute.url = "/project_list";

// tslint:disable-next-line: variable-name
const AccountDetail = ({ match }: any) => {
  return (
    <AccountDetailContainer match={match}>
      <RouterDOM.Switch>
        <RouterDOM.Route
          exact
          path={`${match.path}${ProjectsRoute.url}`}
          component={ProjectsRoute}
        />
        <RouterDOM.Redirect to={`${match.path}${ProjectsRoute.url}`} />
      </RouterDOM.Switch>
    </AccountDetailContainer>
  );
};
AccountDetail.url = "/";

export default AccountDetail;
