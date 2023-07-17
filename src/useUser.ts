import { Auth } from '@supabase/auth-ui-react';
import { useGetUserQuery } from './generated/graphql';

const useUser = () => {
  const { session, user } = Auth.useUser();

  const { data } = useGetUserQuery({ variables: { id: user?.id } });
  const username = data?.getUser?.username;

  return { session, user, username };
};

export default useUser;
