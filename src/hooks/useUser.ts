import { Auth } from '@supabase/auth-ui-react';
import { useUserQuery } from '@/generated/graphql';

const useUser = () => {
  const { session, user } = Auth.useUser();

  const { data, loading, error } = useUserQuery({
    variables: { id: user?.id || '' },
    skip: !user,
  });
  const username = data?.user?.username;

  return { session, user, username, loading, error };
};

export default useUser;
