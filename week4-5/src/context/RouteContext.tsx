import React, { createContext } from "react";
import _ from "lodash";
import { createBrowserHistory } from "history";
import * as RouterDOM from "react-router-dom";

const Context: any = createContext(undefined);

const history: any = createBrowserHistory();

const RouteProvider = (props: any) => {
  const { children } = props;
  return (
    <RouterDOM.Router history={history}>
      <RouterDOM.Route
        render={({ location }) => {
          return (
            <Context.Provider
              value={{
                history,
                hash: location.hash,
                params: _.fromPairs(
                  Array.from(new URLSearchParams(location.search))
                )
              }}
            >
              {children}
            </Context.Provider>
          );
        }}
      />
    </RouterDOM.Router>
  );
};

export default {
  Context,
  Provider: RouteProvider
};
