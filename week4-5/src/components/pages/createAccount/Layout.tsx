import * as React from "react";
import * as MUI from "@material-ui/core";

import CreateAccount from "./CreateAccount";

const Layout = () => {
  return (
    <MUI.Box mt="140px" mb="140px">
      <CreateAccount />
    </MUI.Box>
  );
};

export default Layout;
