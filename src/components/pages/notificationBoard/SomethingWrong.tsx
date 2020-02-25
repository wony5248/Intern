import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";

const SomethingWrong = () => {
  return (
    <LoginLayout>
      <MUI.Typography variant="h3" align="center">
        Sorry, something went wrong.
      </MUI.Typography>
      <MUI.Box mt="20px" mr="auto" ml="auto" width="250px">
        <MUI.Typography variant="subtitle2">
          - The page may have been deleted.
        </MUI.Typography>
        <MUI.Typography variant="subtitle2">
          - You may have lost access to this page.
        </MUI.Typography>
      </MUI.Box>
    </LoginLayout>
  );
};

export default SomethingWrong;
