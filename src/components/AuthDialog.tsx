import React, { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useApolloClient } from '@apollo/client';
import { useDarkMode } from 'usehooks-ts';
import { useUser } from '@/hooks';
import { supabase } from '@/supabase';
import { useSetUsernameMutation } from '@/generated/graphql';
import { Button, Dialog } from '.';

const UsernameForm = () => {
  const [usernameField, setUsernameField] = useState('');
  const [setUsernameMutation, { error }] = useSetUsernameMutation();

  const handleSubmit = async () => {
    try {
      await setUsernameMutation({ variables: { username: usernameField } });
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

const AuthDialogContent = () => {
  const { user, username, loading } = useUser();
  const apolloClient = useApolloClient();
  const { isDarkMode } = useDarkMode();

  supabase.auth.onAuthStateChange(event => {
    console.log(event);
    if (['SIGNED_IN', 'SIGNED_OUT'].includes(event)) {
      apolloClient.resetStore();
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>Welcome {username || user.email}!</div>
        {!username && <UsernameForm />}
        <div className="h-12" />
        <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    );
  }
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
};

interface AuthDialogProps {
  isOpen: boolean;
  hideModal: () => void;
}

const AuthDialog = ({ isOpen, hideModal }: AuthDialogProps) => (
  <Dialog isOpen={isOpen} onClose={hideModal}>
    <AuthDialogContent />
  </Dialog>
);

export default AuthDialog;
