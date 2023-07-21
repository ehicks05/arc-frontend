import { useModal } from 'react-modal-hook';
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
} from 'react-icons/bs';
import { AuthDialog } from '.';
import useUser from '@/hooks/useUser';

interface Props {
  direction?: number;
  handleUpvote: () => void;
  handleDownvote: () => void;
}

const VoteInput = ({ direction, handleUpvote, handleDownvote }: Props) => {
  const { username } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));

  const UpInput = direction === 1 ? BsCaretUpFill : BsCaretUp;
  const DownInput = direction === -1 ? BsCaretDownFill : BsCaretDown;

  return (
    <div className="flex flex-col align-items-center">
      <UpInput
        className="mx-auto"
        role="button"
        onClick={username ? handleUpvote : showAuthModal}
      />
      <DownInput
        className="mx-auto"
        role="button"
        onClick={username ? handleDownvote : showAuthModal}
      />
    </div>
  );
};

export default VoteInput;
