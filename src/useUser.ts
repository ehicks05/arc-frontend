import { Auth } from "@supabase/auth-ui-react";

const useUser = () => {
  const { session, user } = Auth.useUser();

  return { session, user, username: user?.app_metadata?.username };
};

export default useUser;
