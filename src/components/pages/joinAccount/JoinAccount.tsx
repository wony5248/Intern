import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import RouteContext from "context/RouteContext";

// import AuthContext from '../../../context/AuthContext'

const JoinAccount = () => {
  // const authInfo = React.useContext(AuthContext.Context)
  const routeInfo: any = React.useContext(RouteContext.Context);

  const [code, setCode] = React.useState("");
  const [codeHelperText] = React.useState("");

  const handleChangeCode = (e: any) => {
    setCode(e.target.value);
  };

  const handleClickSubmit = () => {
    routeInfo.history.push("/auth/create");
  };

  return (
    <LoginLayout>
      <MUI.Typography variant="h3">
        Enter verification code to continue{" "}
      </MUI.Typography>

      <MUI.Box margin="10px" />
      <MUI.TextField
        variant="filled"
        id="code"
        label="Verification Code"
        value={code}
        helperText={codeHelperText}
        error={!!codeHelperText}
        autoFocus={true}
        onChange={handleChangeCode}
      />
      <MUI.Box margin="10px" />
      <MUI.Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickSubmit}
      >
        submit
      </MUI.Button>
    </LoginLayout>
  );
};

export default JoinAccount;
