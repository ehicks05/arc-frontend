import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useApolloClient } from '@apollo/client';
import { useDarkMode } from 'usehooks-ts';
import { useUser } from '@/hooks';
import { supabase } from '@/supabase';
import { useSetUsernameMutation } from '@/generated/graphql';
import { Button, Dialog, Loading } from '.';

const UsernameForm = () => {
  const [usernameField, setUsernameField] = useState('');
  const [setUsernameMutation, { error }] = useSetUsernameMutation();

  const handleSubmit = async () => {
    try {
      await setUsernameMutation({
        variables: { input: { username: usernameField } },
      });
      await supabase.auth.refreshSession();
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameField(e.target.value);
  };

  return (
    <>
      <div>Create a username to start posting!</div>
      <input
        className="p-1"
        placeholder="username"
        value={usernameField}
        onChange={onChange}
      />
      {error?.message && error.message}
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

const AuthDialogContent = ({ hideModal }: { hideModal: () => void }) => {
  const { user, username, loading } = useUser();
  const apolloClient = useApolloClient();
  const { isDarkMode } = useDarkMode();
  const [signedInEventFired, setSignedInEventFired] = useState(false);

  supabase.auth.onAuthStateChange(event => {
    if (['SIGNED_IN', 'SIGNED_OUT'].includes(event)) {
      apolloClient.resetStore();
    }
    if (event === 'SIGNED_IN') {
      setSignedInEventFired(true);
    }
  });

  useEffect(() => {
    if (signedInEventFired && username) {
      hideModal();
    }
  }, [signedInEventFired, username, hideModal]);

  if (!loading && user && !username) {
    return (
      <div className="flex flex-col gap-4">
        <div>Welcome {username || user.email}!</div>
        {!username && <UsernameForm />}
      </div>
    );
  }
  if (!user) {
    return (
      <Auth
        providers={[]}
        theme={isDarkMode ? 'dark' : 'default'}
        appearance={{
          theme: ThemeSupa,
        }}
        supabaseClient={supabase}
      />
    );
  }

  return <Loading />;
};

interface AuthDialogProps {
  isOpen: boolean;
  hideModal: () => void;
}

const AuthDialog = ({ isOpen, hideModal }: AuthDialogProps) => (
  <Dialog isOpen={isOpen} onClose={hideModal}>
    <AuthDialogContent hideModal={hideModal} />
  </Dialog>
);

export default AuthDialog;
