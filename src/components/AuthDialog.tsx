import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { SupabaseClient } from '@supabase/supabase-js';
import { useApolloClient } from '@apollo/client';
import useUser from '../useUser';
import { supabase } from '../supabase';
import { useSetUsernameMutation } from '../generated/graphql';
// import Button from "./Button";

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
    <Dialog
      open={isOpen}
      onClose={hideModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="z-20 bg-neutral-800 rounded max-w-sm mx-auto">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
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
          </div>

          <div className="bg-neutral-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={hideModal}>Close</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const Container: React.FC<{ supabaseClient: SupabaseClient; children: any }> = ({
  supabaseClient,
  children,
}) => {
  const { user, username } = useUser();
  const [usernameField, setUsernameField] = useState('');
  const [setUsernameMutation, { error }] = useSetUsernameMutation();
  console.log({ error });
  const handleSubmit = async () => {
    try {
      await setUsernameMutation({ variables: { username } });
      await supabaseClient.auth.refreshSession();
    } catch (e) {
      console.log(e);
    }
  };

  if (user) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <span>Welcome {user.email}!</span>
        </div>
        {!username && (
          <>
            <div>
              <span>Create a username to start posting!</span>
            </div>
            <input
              // label="Username"
              // icon={<IconUser />}
              value={usernameField}
              className="text-black"
              onChange={e => {
                setUsernameField(e.target.value);
              }}
              // error={error?.message}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => supabaseClient.auth.refreshSession()}>
              refresh
            </button>
            <div className="h-12" />
          </>
        )}
        <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      </div>
    );
  }
  return children;
};

export default AuthDialog;
