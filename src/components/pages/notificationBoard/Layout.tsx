import React from "react";
import * as MUI from "@material-ui/core";
import CreateAccountSuccess from "./CreateAccountSuccess";

const Messages: any = (props: any) => {
  const { mode } = props;

  switch (mode) {
    case "welcome":
      return <CreateAccountSuccess />;
    default:
      break;
  }
};
const Layout = (props: any) => {
  const { mode }: any = props;

  return (
    <MUI.Box mt="140px" mb="140px">
      <Messages mode={mode} />
    </MUI.Box>
  );
};

export default Layout;
