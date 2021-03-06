import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
  BsDot,
} from "react-icons/bs";
import useUser from "useUser";

const VoteInput = ({ netVotes, direction, handleUpvote, handleDownvote }) => {
  const { username } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));

  const UpInput = direction === 1 ? BsCaretUpFill : BsCaretUp;
  const DownInput = direction === -1 ? BsCaretDownFill : BsCaretDown;

  return (
    <div className="flex flex-col align-items-center gap-1">
      <UpInput
        className="mx-auto"
        role="button"
        onClick={username ? handleUpvote : showAuthModal}
      />
      <div className="text-xs sm:text-base mx-auto opacity-50">
        {netVotes || <BsDot />}
      </div>
      <DownInput
        className="mx-auto"
        role="button"
        onClick={username ? handleDownvote : showAuthModal}
      />
    </div>
  );
};

export default VoteInput;
