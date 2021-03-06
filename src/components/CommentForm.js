import React from "react";
import { Button } from "./index";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";
import useUser from "useUser";

const CommentForm = ({ content, setContent, handleSubmit, setEditMode }) => {
  const { username } = useUser();

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
          onClick={username ? handleSubmit : showAuthModal}
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
