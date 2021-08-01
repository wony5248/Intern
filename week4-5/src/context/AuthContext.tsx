import React, { createContext, useState, useEffect } from "react";
import _ from "lodash";
import jwt_decode from "jwt-decode";
import AuthService from "services/AuthService";
import CircularProgressDialog from "components/elements/CircularProgressDialog";
import { defaultProps } from "react-select/src/Select";
import { User } from "@sentry/browser";

declare global {
  interface Window {
    analytics: any;
  }
}
interface UserInterface {
  accountName?: string;
  role?: string;
  tier?: any;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}
const Context = createContext<any | undefined>(undefined);

const AuthProvider = (props: UserInterface) => {
  const { children } = props;

  const [accountName, setAccountName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [tier, setTier] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const userInfo: any = await AuthService.loginWithStorage(jwt_decode);
        const res: any = await AuthService.getUserInfo(userInfo.email);
        setAccountName(userInfo["custom:tenant_name"]);
        setEmail(userInfo.email);
        setRole(_.lowerCase(userInfo["custom:tenant_role"]));
        setTier(userInfo["custom:tier"]);
        setName(`${userInfo["given_name"]} ${userInfo["family_name"]}`);
        setFirstName(userInfo["given_name"]);
        setLastName(userInfo["family_name"]);
        setAvatarUrl(res.data.data.avatarUrl);
        setIsLoading(false);
      } catch (err) {
        removeUserInfo();
        setIsLoading(false);
      }
    })();

    // eslint-disable-next-line
  }, []);

  const login = async (
    accountName: string,
    email: string,
    password: string
  ) => {
    const data: any = await AuthService.login({
      tenantId: accountName,
      email,
      password
    });
    if (data.hasOwnProperty("session")) {
      const { session }: any = data;
      return { hasSession: true, data: { accountName, email, session } };
    } else {
      const { idToken, lastLoginedAt }: any = data;
      const userInfo: any = jwt_decode(idToken);
      const userName: string = `${userInfo["given_name"]} ${userInfo["family_name"]}`;
      const userRole: string = _.lowerCase(userInfo["custom:tenant_role"]);

      setAccountName(accountName);
      setEmail(email);
      setRole(userRole);
      setTier(userInfo["custom:tier"]);
      setName(userName);
      setFirstName(userInfo["given_name"]);
      setLastName(userInfo["family_name"]);
      const getUserInfoForAvatar = await AuthService.getUserInfo(
        userInfo.email
      );
      setAvatarUrl(getUserInfoForAvatar.data.data.avatarUrl);

      if (!lastLoginedAt) {
        window.analytics.track("first_log_in", {
          category: accountName,
          label: email
        });
      }

      window.analytics.track("log_in", {
        category: accountName,
        label: email,
        value: Date.now()
      });

      window.analytics.track(`${userRole}_log_in`, {
        category: accountName,
        label: email,
        value: Date.now()
      });

      window.analytics.identify(accountName, {
        name: userName,
        email: { email }
      });

      return { hasSession: false, data };
    }
  };

  const logout = () => {
    AuthService.logout();
    removeUserInfo();
  };

  const removeUserInfo = () => {
    setAccountName("");
    setEmail("");
    setRole("");
    setTier("");
    setName("");
    setFirstName("");
    setLastName("");
  };

  if (isLoading) return <CircularProgressDialog isLoading={isLoading} />;

  return (
    <Context.Provider
      value={{
        accountName,
        setAccountName,
        email,
        setEmail,
        role,
        setRole,
        tier,
        setTier,
        name,
        setName,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        avatarUrl,
        setAvatarUrl,
        login,
        logout
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default {
  Context,
  Provider: AuthProvider
};
