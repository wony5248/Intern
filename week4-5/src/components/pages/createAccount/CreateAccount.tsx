import * as React from "react";
import * as MUI from "@material-ui/core";

import LoginLayout from "components/layouts/LoginLayout";
import RouteContext from "context/RouteContext";
import { RegexUtils } from "utils/SpbUtils";
import AuthService from "services/AuthService";
import CircularProgressDialog from "components/elements/CircularProgressDialog";
import PasswordInputCheck from "components/elements/PasswordInputCheck";
import ReconfirmDialog from "components/elements/ReconfirmDialog";
import WaitlistDialog from "components/pages/createAccount/WaitlistDialog";

const CreateAccount = () => {
  const routeInfo: any = React.useContext(RouteContext.Context);

  const [isLoading, setIsLoading] = React.useState(true);
  const [isInvited, setIsInvited] = React.useState(false);
  const [isRequesting, setIsRequesting] = React.useState(false);

  const [session, setSession] = React.useState("");

  const [accountName, setAccountName] = React.useState("");
  const [accountNameHelperText, setAccountNameHelperText] = React.useState("");

  const [affiliation, setAffiliation] = React.useState("");
  const [affiliationHelperText, setAffiliationHelperText] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [firstNameHelperText, setFirstNameHelperText] = React.useState("");

  const [lastName, setLastName] = React.useState("");
  const [lastNameHelperText, setLastNameHelperText] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [emailHelperText, setEmailHelperText] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordHelperText, setPasswordHelperText] = React.useState("");

  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [
    confirmPasswordHelperText,
    setConfirmPasswordHelperText
  ] = React.useState("");

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isWaitlistDialogOpen, setIsWaitlistDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (routeInfo.params.hasOwnProperty("session")) {
      const { tenantId, email, session } = routeInfo.params;
      setAccountName(atob(tenantId));
      setEmail(atob(email));
      setSession(session);
      setIsInvited(true);
    }

    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const handleChangeAccountName = (e: any) => {
    const {
      target: { value }
    } = e;
    const isLengthValid = value.length >= 4 && value.length <= 20;

    setAccountName(value);

    if (RegexUtils.isGeneralNaming(value)) {
      setAccountNameHelperText("Please enter a valid account name.");
    } else if (!isLengthValid) {
      setAccountNameHelperText(
        "Account name must be between 4 - 20 characters long."
      );
    } else {
      setAccountNameHelperText("");
    }
  };

  const handleChangeAffiliation = (e: any) => {
    const {
      target: { value }
    } = e;
    setAffiliation(value);
  };

  const handleChangeFirstName = (e: any) => {
    const {
      target: { value }
    } = e;
    setFirstName(value);
  };

  const handleChangeLastName = (e: any) => {
    const {
      target: { value }
    } = e;
    setLastName(value);
  };

  const handleChangeEmail = (e: any) => {
    const {
      target: { value }
    } = e;
    setEmail(value);
  };

  const handleClickNext = async () => {
    if (
      accountName === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      if (accountName === "")
        setAccountNameHelperText("Please fill out all required fields.");
      if (email === "")
        setEmailHelperText("Please fill out all required fields.");
      if (firstName === "")
        setFirstNameHelperText("Please fill out all required fields.");
      if (lastName === "")
        setLastNameHelperText("Please fill out all required fields.");
      if (password === "")
        setPasswordHelperText("Please fill out all required fields.");
      if (confirmPassword === "")
        setConfirmPasswordHelperText("Please fill out all required fields.");
      return;
    }
    if (!isInvited && affiliation === "") {
      setAffiliationHelperText("Please fill out all required fields.");
    }
    if (
      accountNameHelperText !== "" ||
      emailHelperText !== "" ||
      passwordHelperText !== "" ||
      confirmPasswordHelperText !== ""
    ) {
      return;
    }

    if (isRequesting) return;
    setIsRequesting(true);

    if (isInvited) {
      try {
        await AuthService.changePasswordAfterInvite({
          tenantId: accountName,
          email,
          session,
          newPassword: password,
          givenName: firstName,
          familyName: lastName
        });

        window.analytics.track("submit_sign_up", {
          category: accountName,
          label: email
        });

        routeInfo.history.push(
          `/auth/login?tenantId=${btoa(accountName)}&email=${btoa(email)}`
        );
      } catch (err) {
        setIsDialogOpen(err.message);
      }
    } else {
      try {
        await AuthService.createAccount({
          tenantId: accountName,
          affiliation,
          email,
          password,
          givenName: firstName,
          familyName: lastName
        });

        window.analytics.track("submit_sign_up", {
          category: accountName,
          label: email
        });

        routeInfo.history.push(
          `/auth/check_email?tenantId=${btoa(accountName)}&email=${btoa(email)}`
        );
      } catch (err) {
        if (err.message === "Not on waitlist") {
          setIsWaitlistDialogOpen(true);
        } else {
          setIsDialogOpen(err.message);
        }
      }
    }
    setIsRequesting(false);
  };

  const handleBlurAccountName = async () => {
    if (accountName === "") {
      setAccountNameHelperText("Please fill out all required fields.");
      return;
    }

    try {
      await AuthService.checkAccountName(accountName);
    } catch (err) {
      if (err.message === "Already exists") {
        setAccountNameHelperText("That Account Name already exists");
        return;
      }
    }
  };

  const handleBlurAffiliation = () => {
    if (affiliation === "") {
      setAffiliationHelperText("Please fill out all required fields.");
    } else {
      setAffiliationHelperText("");
    }
  };

  const handleBlurEmail = () => {
    if (email === "") {
      setEmailHelperText("Please fill out all required fields.");
    }
    checkEmailValidity();
  };

  const handleBlurFirstName = () => {
    if (firstName === "") {
      setFirstNameHelperText("Please fill out all required fields.");
    } else {
      setFirstNameHelperText("");
    }
  };

  const handleBlurLastName = () => {
    if (lastName === "") {
      setLastNameHelperText("Please fill out all required fields.");
    } else {
      setLastNameHelperText("");
    }
  };

  const handleEnterKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleClickNext();
    }
  };

  const checkEmailValidity = () => {
    if (!RegexUtils.isEmail(email)) {
      setEmailHelperText("Please enter a valid email address.");
    } else if (checkEmail()) {
      setEmailHelperText("That Email already exists");
    } else {
      setEmailHelperText("");
    }
  };

  const checkEmail = () => {
    let isEmailNew: any;
    AuthService.checkEmail(accountName, email)
      .then((res: any) => {
        isEmailNew = true;
      })
      .catch((err: any) => {
        // TODO (shko): check server error
        isEmailNew = false;
      });

    return isEmailNew;
  };

  const handleClickTermsOfUse = () => {
    window.open(
      "https://www.notion.so/superbai/Terms-of-Use-a20d09ccfc28469987e61552eee3e3c4"
    );
  };

  const handleClickPrivacyPolicy = () => {
    window.open(
      "https://www.notion.so/superbai/Privacy-Policy-880523efa01649708e64696332d1ca60"
    );
  };

  const handleClickConfirmDialog = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) return <CircularProgressDialog isLoading={isLoading} />;
  // Message : Only invited users can create an account at the moment. Please sign up to our waitlist.
  return (
    <LoginLayout>
      <MUI.Typography variant="h3">Sign up</MUI.Typography>
      <MUI.Box margin="15px" />
      <MUI.TextField
        variant="filled"
        margin="dense"
        id="accountName"
        label="Account Name"
        value={accountName}
        helperText={accountNameHelperText}
        error={!!accountNameHelperText}
        autoFocus={!isInvited}
        onBlur={handleBlurAccountName}
        onChange={handleChangeAccountName}
        disabled={isInvited}
      />
      <MUI.Box m="3px 12px 0">
        <MUI.Typography color="textSecondary" variant="body2">
          Your account name can only contain lowercase letters, numbers, and
          dashes (and must start with a letter).
        </MUI.Typography>
      </MUI.Box>

      <MUI.Box margin="5px" />

      {!isInvited && (
        <MUI.TextField
          variant="filled"
          margin="dense"
          label="Affiliation"
          value={affiliation}
          onBlur={handleBlurAffiliation}
          helperText={affiliationHelperText}
          error={!!affiliationHelperText}
          onChange={handleChangeAffiliation}
        />
      )}

      <MUI.Box margin="5px" />

      <MUI.TextField
        variant="filled"
        margin="dense"
        id="email"
        label="Work Email"
        value={email}
        onBlur={handleBlurEmail}
        helperText={emailHelperText}
        error={!!emailHelperText}
        onChange={handleChangeEmail}
        disabled={isInvited}
      />
      <MUI.Box margin="5px" />

      <MUI.TextField
        variant="filled"
        margin="dense"
        id="firstName"
        label="First Name"
        autoFocus={isInvited}
        value={firstName}
        onBlur={handleBlurFirstName}
        helperText={firstNameHelperText}
        error={!!firstNameHelperText}
        onChange={handleChangeFirstName}
      />
      <MUI.Box margin="5px" />

      <MUI.TextField
        variant="filled"
        margin="dense"
        id="lastName"
        label="Last Name"
        value={lastName}
        onBlur={handleBlurLastName}
        helperText={lastNameHelperText}
        error={!!lastNameHelperText}
        onChange={handleChangeLastName}
      />
      <MUI.Box margin="5px" />
      <PasswordInputCheck
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onEnterKeyDown={handleEnterKeyDown}
        passwordHelperText={passwordHelperText}
        setPasswordHelperText={setPasswordHelperText}
        confirmPasswordHelperText={confirmPasswordHelperText}
        setConfirmPasswordHelperText={setConfirmPasswordHelperText}
      />
      <MUI.Box margin="10px" />
      <MUI.Typography color="textSecondary" align="center">
        By creating your Superb AI Account you also agree
      </MUI.Typography>
      <MUI.Box display="block" textAlign="center">
        <MUI.Typography display="inline" color="textSecondary">
          to our{" "}
        </MUI.Typography>
        <MUI.Link
          onClick={handleClickTermsOfUse}
          variant="body1"
          display="inline"
          color="textSecondary"
        >
          Terms of Use
        </MUI.Link>
        <MUI.Typography display="inline" color="textSecondary">
          {" "}
          and{" "}
        </MUI.Typography>
        <MUI.Link
          onClick={handleClickPrivacyPolicy}
          variant="body1"
          display="inline"
          color="textSecondary"
        >
          Privacy Policy
        </MUI.Link>
      </MUI.Box>
      <MUI.Box margin="10px" />
      <MUI.Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickNext}
      >
        NEXT
      </MUI.Button>

      <ReconfirmDialog
        hasCancelButton={false}
        variant="error"
        message={isDialogOpen}
        isDialogOpen={!!isDialogOpen}
        onClickConfirm={handleClickConfirmDialog}
      />
      <WaitlistDialog
        isDialogOpen={isWaitlistDialogOpen}
        setIsDialogOpen={setIsWaitlistDialogOpen}
        fullName={`${firstName} ${lastName}`}
        email={email}
        setAccountName={setAccountName}
        setAffiliation={setAffiliation}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
      {isRequesting && <CircularProgressDialog isLoading={isRequesting} />}
    </LoginLayout>
  );
};

export default CreateAccount;
