import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import CircularProgressDialog from "components/elements/CircularProgressDialog";
import AuthContext from "context/AuthContext";
import { RegexUtils } from "utils/SpbUtils";
import RouteContext from "context/RouteContext";
import ReconfirmDialog from "components/elements/ReconfirmDialog";

const LoginForm = (props: any) => {
  const { mode } = props;

  const authInfo: any = React.useContext(AuthContext.Context);
  const routeInfo: any = React.useContext(RouteContext.Context);

  const [isRequesting, setIsRequesting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [accountName, setAccountName] = React.useState("");
  const [accountNameHelperText, setAccountNameHelperText] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [hasLoginInfo, setHasLoginInfo] = React.useState(false);
  const [emailHelperText, setEmailHelperText] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordHelperText, setPasswordHelperText] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);

    if (
      localStorage.getItem("spb_access") ||
      localStorage.getItem("spb_user") ||
      localStorage.getItem("spb_")
    ) {
      localStorage.removeItem("spb_access");
      localStorage.removeItem("spb_user");
      localStorage.removeItem("spb_");
    }

    const { tenantId, email } = routeInfo.params;

    if (tenantId && email) {
      setAccountName(atob(tenantId));
      setEmail(atob(email));
      setHasLoginInfo(true);
    }

    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const handleChangeAccountName = (e: any) => {
    setAccountName(e.target.value);
  };

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    checkEmailValidity(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleEnterKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleClickLogin();
    }
  };

  const checkEmailValidity = (value: any) => {
    if (!RegexUtils.isEmail(value)) {
      setEmailHelperText("Please enter a valid email address.");
    } else {
      setEmailHelperText("");
    }
  };

  const handleClickLogin = async () => {
    if (accountName === "" || email === "" || password === "") {
      if (accountName === "") {
        setAccountNameHelperText("Please fill out all required fields.");
      }
      if (email === "") {
        setEmailHelperText("Please fill out all required fields.");
      }
      if (password === "") {
        setPasswordHelperText("Please fill out all required fields.");
      }
      return;
    }
    if (emailHelperText !== "") {
      return;
    } else {
      if (isRequesting) return;
      setIsRequesting(true);
      try {
        const res = await authInfo.login(accountName, email, password);

        if (res.hasSession) {
          const { accountName, email, session } = res.data;
          routeInfo.history.push(
            `/auth/create?tenantId=${btoa(accountName)}&email=${btoa(
              email
            )}&session=${session}`
          );

          return;
        }

        routeInfo.history.push("/");
        setIsRequesting(false);
      } catch (err) {
        setIsDialogOpen(err.message);
        setIsRequesting(false);
      }
    }
  };

  const handleClickConfirmDialog = () => {
    setPassword("");
    setIsDialogOpen("");
  };

  // TODO (tsnoh): authInfo의 유무로 사용중이었음. 문제가 발생하는지 테스트 필요
  if (isLoading) return <CircularProgressDialog isLoading={isLoading} />;

  return (
    <LoginLayout>
      {mode === "login" ? (
        <MUI.Typography variant="h3">Log in</MUI.Typography>
      ) : (
        <MUI.Typography variant="h3">
          Enter your password to log in
        </MUI.Typography>
      )}
      <MUI.Box margin="15px" />
      <MUI.TextField
        variant="filled"
        id="accountName"
        label="Account Name"
        value={accountName}
        helperText={accountNameHelperText}
        error={!!accountNameHelperText}
        autoFocus={!hasLoginInfo}
        disabled={hasLoginInfo}
        onChange={handleChangeAccountName}
      />
      <MUI.Box margin="10px" />
      <MUI.TextField
        variant="filled"
        type="text"
        id="email"
        label="Email"
        value={email}
        helperText={emailHelperText}
        error={!!emailHelperText}
        disabled={hasLoginInfo}
        onChange={handleChangeEmail}
      />
      <MUI.Box margin="10px" />
      <MUI.TextField
        variant="filled"
        type="password"
        id="password"
        label="Password"
        value={password}
        helperText={passwordHelperText}
        error={!!passwordHelperText}
        autoFocus={hasLoginInfo}
        onChange={handleChangePassword}
        onKeyDown={handleEnterKeyDown}
      />

      <MUI.Box margin="10px" />
      <MUI.Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickLogin}
      >
        LOG IN
      </MUI.Button>
      <MUI.Box margin="10px" />

      {/* {mode === 'login' &&
        <>
          <MUI.Link
            align="center"
            color="textPrimary"
            variant="body2"
            href="/auth/create"
          >Create an account</MUI.Link>
          <MUI.Box margin='5px' />
        </>
      } */}

      <MUI.Link
        align="center"
        color="textPrimary"
        variant="body2"
        href="/auth/forgot"
      >
        Forgot password?
      </MUI.Link>

      <ReconfirmDialog
        hasCancelButton={false}
        variant="error"
        message={
          isDialogOpen === "Your account has been locked" ? (
            <MUI.Typography variant="subtitle1">
              Please contact us at <MUI.Link>support@superb-ai.com</MUI.Link>
            </MUI.Typography>
          ) : (
            isDialogOpen
          )
        }
        isDialogOpen={!!isDialogOpen}
        onClickConfirm={handleClickConfirmDialog}
      />
    </LoginLayout>
  );
};

export default LoginForm;
