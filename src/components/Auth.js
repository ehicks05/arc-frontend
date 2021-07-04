import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth = () => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>...</div>;

  return isAuthenticated ? (
    <button onClick={() => logout()}>Log Out</button>
  ) : (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
};

export default Auth;
