import { Auth } from "@supabase/ui";
import AuthDialog from "./AuthDialog";
import { useModal } from "react-modal-hook";
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
  BsDot,
} from "react-icons/all";

const VoteInput = ({ netVotes, direction, handleUpvote, handleDownvote }) => {
  const { user } = Auth.useUser();
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
        onClick={user ? handleUpvote : showAuthModal}
      />
      <div className="mx-auto opacity-50">{netVotes || <BsDot />}</div>
      <DownInput
        className="mx-auto"
        role="button"
        onClick={user ? handleDownvote : showAuthModal}
      />
    </div>
  );
};

export default VoteInput;
