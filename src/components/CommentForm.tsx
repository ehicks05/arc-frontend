import useUser from '@/hooks/useUser';
import { useModal } from 'react-modal-hook';
import TextareaAutosize from 'react-textarea-autosize';
import { AuthDialog, Button } from '.';

interface Props {
  content: string;
  setContent: (content: string) => void;
  handleSubmit: () => void;
  setEditMode: (isEdit: boolean) => void;
}

/** Used by both CommentCreateForm and CommentEditForm  */
const CommentForm = ({
  content,
  setContent,
  handleSubmit,
  setEditMode,
}: Props) => {
  const { username } = useUser();

  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));

  return (
    <div className="w-full">
      <TextareaAutosize
        minRows={3}
        className="w-full p-1 text-sm dark:bg-neutral-800 dark:text-neutral-200"
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
