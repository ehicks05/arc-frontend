import React from "react";
import { Button } from "./index";
import { Auth } from "@supabase/ui";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";

const CommentForm = ({ content, setContent, handleSubmit, setEditMode }) => {
  const { user } = Auth.useUser();

  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));

  return (
    <div>
      <textarea
        className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100"
        placeholder={"add a comment"}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-4">
        <Button
          className="text-xs"
          disabled={!content}
          onClick={user ? handleSubmit : showAuthModal}
        >
          Submit
        </Button>
        <Button className="text-xs" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
