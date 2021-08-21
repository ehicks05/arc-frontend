import { Dialog } from "@headlessui/react";
import React from "react";
import { Auth, Button, Typography } from "@supabase/ui";
import { useClient, useAuthStateChange } from "react-supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { useApolloClient } from "@apollo/client";
import useUser from "useUser";

const AuthDialog = ({
  isOpen,
  hideModal,
}: {
  isOpen: boolean;
  hideModal: () => void;
}) => {
  const supabase = useClient();
  const apolloClient = useApolloClient();

  useAuthStateChange((event) => {
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

        <div className="z-20 bg-white rounded max-w-sm mx-auto">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Container supabaseClient={supabase}>
              <Auth supabaseClient={supabase} />
            </Container>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button type="default" onClick={hideModal}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const Container: React.FC<{ supabaseClient: SupabaseClient; children: any }> =
  ({ supabaseClient, children }) => {
    const { user } = Auth.useUser();
    const { isRegistered } = useUser();
    if (user) {
      if (isRegistered) {
        return (
          <>
            <Typography.Text>Signed in: {user.email}</Typography.Text>
            <Typography.Text>
              Username: {user.app_metadata.username}
            </Typography.Text>
            <Button block onClick={() => supabaseClient.auth.signOut()}>
              Sign out
            </Button>
          </>
        );
      } else {
        return (
          <>
            <div>
              <Typography.Text>
                Create a username to start posting!
              </Typography.Text>
            </div>
            <div>
              <Typography.Text>Signed in: {user.email}</Typography.Text>
            </div>
            <Typography.Text>
              Username: {user.app_metadata.username}
            </Typography.Text>
            <Button block onClick={() => supabaseClient.auth.signOut()}>
              Sign out
            </Button>
          </>
        );
      }
    }
    return children;
  };

export default AuthDialog;
