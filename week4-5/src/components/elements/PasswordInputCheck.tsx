import * as React from "react";
import * as MUI from "@material-ui/core";

import { RegexUtils } from "utils/SpbUtils";

const PasswordInputCheck = (props: any) => {
  const {
    password,
    setPassword,
    setPasswordHelperText,
    passwordHelperText,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordHelperText,
    setConfirmPasswordHelperText,
    onEnterKeyDown,
    autoFocus,
    fullWidth,
    isNew = false
  } = props;

  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false);

  const handleChangePassword = (e: any) => {
    const {
      target: { value }
    } = e;
    setPassword(value);
    checkPasswordValidity(value);
  };

  const handleChangeConfirmPassword = (e: any) => {
    const {
      target: { value }
    } = e;
    setConfirmPassword(value);
    checkConfirmPassword(value);
  };

  const handleBlurPassword = () => {
    setIsPasswordFocused(false);
    if (!password) {
      setPasswordHelperText("Please fill out all required fields.");
      return;
    }
    checkPasswordValidity(password);
  };

  const handleBlurConfirmPassword = () => {
    checkConfirmPassword(confirmPassword);
  };

  const checkPasswordValidity = (value: any) => {
    if (RegexUtils.isNotValidPassword(value)) {
      setPasswordHelperText("Please enter a valid password.");
    } else {
      setPasswordHelperText("");
    }
  };

  const checkConfirmPassword = (value: any) => {
    if (password !== value) {
      setConfirmPasswordHelperText(
        "The password and confirm password do not match."
      );
    } else {
      setConfirmPasswordHelperText("");
    }
  };

  return (
    <React.Fragment>
      <MUI.TextField
        variant="filled"
        margin="dense"
        type="password"
        id="password"
        label={isNew ? "New Password" : "Password"}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        value={password}
        helperText={passwordHelperText}
        error={!!passwordHelperText}
        onChange={handleChangePassword}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={handleBlurPassword}
      />
      {(isPasswordFocused ||
        passwordHelperText === "Please enter a valid password.") && (
        <MUI.Box m="3px 12px 0">
          <MUI.Typography
            variant="body2"
            color={password.length >= 8 ? "secondary" : "textSecondary"}
          >
            - At least 8 characters
          </MUI.Typography>
          <MUI.Typography
            variant="body2"
            color={
              RegexUtils.hasUppercaseLetter(password)
                ? "secondary"
                : "textSecondary"
            }
          >
            - At least one uppercase letter.
          </MUI.Typography>
          <MUI.Typography
            variant="body2"
            color={
              RegexUtils.hasLowercaseLetter(password)
                ? "secondary"
                : "textSecondary"
            }
          >
            - At least one lowercase letter.
          </MUI.Typography>
          <MUI.Typography
            variant="body2"
            color={
              RegexUtils.hasNumericDigit(password)
                ? "secondary"
                : "textSecondary"
            }
          >
            - At least one numeric digit.
          </MUI.Typography>
        </MUI.Box>
      )}
      <MUI.Box margin="5px" />

      <MUI.TextField
        variant="filled"
        margin="dense"
        type="password"
        id="confirmPassword"
        label="Confirm Password"
        fullWidth={fullWidth}
        value={confirmPassword}
        helperText={confirmPasswordHelperText}
        error={!!confirmPasswordHelperText}
        onChange={handleChangeConfirmPassword}
        onBlur={handleBlurConfirmPassword}
        onKeyDown={onEnterKeyDown}
      />
    </React.Fragment>
  );
};

export default PasswordInputCheck;
