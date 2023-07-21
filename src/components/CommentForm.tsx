import React from 'react';
import { useModal } from 'react-modal-hook';
import { AuthDialog, Button } from '.';
import useUser from '@/hooks/useUser';

interface Props {
  content: string;
  setContent: (content: string) => void;
  handleSubmit: () => void;
  setEditMode: (isEdit: boolean) => void;
}

const CommentForm = ({ content, setContent, handleSubmit, setEditMode }: Props) => {
  const { username } = useUser();

  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));

  return (
    <div>
      <textarea
        className="w-full max-w-prose p-1 border dark:border-gray-600 dark:bg-neutral-600 dark:text-neutral-100"
        placeholder="add a comment"
        value={content}
        onChange={e => setContent(e.target.value)}
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
