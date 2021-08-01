import React from "react";
import _ from "lodash";

import Layout from "./Layout";

const NotificationBoard = (props: any) => {
  const mode = _.last(props.location.pathname.split("/"));

  return <Layout mode={mode} />;
};

export default NotificationBoard;
