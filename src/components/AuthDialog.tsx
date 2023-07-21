import { Dialog as HUIDialog } from '@headlessui/react';
import React, { ReactNode, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SupabaseClient } from '@supabase/supabase-js';
import { useApolloClient } from '@apollo/client';
import useUser from '../useUser';
import { supabase } from '../supabase';
import { useSetUsernameMutation } from '../generated/graphql';
import Button from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => (
  <HUIDialog
    open={isOpen}
    onClose={onClose}
    className="fixed z-10 inset-0 overflow-y-auto"
  >
    <div className="flex items-center justify-center min-h-screen">
      <HUIDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="z-20 bg-neutral-800 rounded max-w-sm mx-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">{children}</div>

        <div className="bg-neutral-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  </HUIDialog>
);

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

const Container: React.FC<{
  supabaseClient: SupabaseClient;
  children: any;
}> = ({ supabaseClient, children }) => {
  const { user, username, loading } = useUser();

  if (loading) {
    return 'Loading...';
  }

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>Welcome {username || user.email}!</div>
        {!username && <UsernameForm />}
        <div className="h-12" />
        <Button onClick={() => supabaseClient.auth.signOut()}>Sign out</Button>
      </div>
    );
  }
  return children;
};

const AuthDialog = ({
  isOpen,
  hideModal,
}: {
  isOpen: boolean;
  hideModal: () => void;
}) => {
  const supabaseClient = supabase;
  const apolloClient = useApolloClient();

  supabaseClient.auth.onAuthStateChange(event => {
    console.log(event);
    apolloClient.resetStore();
  });

  return (
    <Dialog isOpen={isOpen} onClose={hideModal}>
      <Container supabaseClient={supabaseClient}>
        <Auth
          providers={[]}
          theme="dark"
          appearance={{
            theme: ThemeSupa,
          }}
          supabaseClient={supabase}
        />
      </Container>
    </Dialog>
  );
};

export default AuthDialog;
