import { Auth } from "@supabase/ui";

const useUser = () => {
  const { session, user } = Auth.useUser();

  return { session, user, isRegistered: !!user?.app_metadata?.username };
};

export default useUser;
