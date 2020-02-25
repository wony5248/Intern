import React from "react";
import * as MUI from "@material-ui/core";

const UserAvatar = (props: any) => {
  const { className } = props;
  const { userInfo } = props;
  const { avatarUrl, name, email } = userInfo;

  if (avatarUrl) {
    return <MUI.Avatar className={className} src={avatarUrl} />;
  } else if (name) {
    return <MUI.Avatar className={className}>{name.charAt(0)}</MUI.Avatar>;
  } else {
    return <MUI.Avatar className={className}>{email.charAt(0)}</MUI.Avatar>;
  }
};

export default UserAvatar;
