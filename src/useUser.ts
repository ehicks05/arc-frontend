import { Auth } from '@supabase/auth-ui-react';
import { useGetUserQuery } from './generated/graphql';

const useUser = () => {
  const { session, user } = Auth.useUser();

  const { data, loading, error } = useGetUserQuery({
    variables: { id: user?.id },
    skip: !user,
  });
  const username = data?.getUser?.username;

  return { session, user, username, loading, error };
};

export default useUser;
