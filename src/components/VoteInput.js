import { useAuth0 } from "@auth0/auth0-react";
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
  BsDot,
} from "react-icons/all";

const VoteInput = ({ netVotes, direction, handleUpvote, handleDownvote }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const UpInput = direction === 1 ? BsCaretUpFill : BsCaretUp;
  const DownInput = direction === -1 ? BsCaretDownFill : BsCaretDown;

  return (
    <div className="flex flex-col align-items-center gap-1">
      <UpInput
        className="mx-auto"
        role="button"
        onClick={isAuthenticated ? handleUpvote : loginWithRedirect}
      />
      <div className="mx-auto opacity-50">{netVotes || <BsDot />}</div>
      <DownInput
        className="mx-auto"
        role="button"
        onClick={isAuthenticated ? handleDownvote : loginWithRedirect}
      />
    </div>
  );
};

export default VoteInput;
