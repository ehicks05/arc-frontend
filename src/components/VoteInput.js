import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
  BsDot,
} from "react-icons/all";

const VoteInput = ({
  netVotes,
  upvoted,
  downvoted,
  handleUpvote,
  handleDownvote,
}) => {
  const UpInput = upvoted ? BsCaretUpFill : BsCaretUp;
  const DownInput = downvoted ? BsCaretDownFill : BsCaretDown;

  return (
    <div className="flex flex-col align-items-center gap-1">
      <UpInput className="mx-auto" role="button" onClick={handleUpvote} />
      <div className="mx-auto opacity-50">{netVotes || <BsDot />}</div>
      <DownInput className="mx-auto" role="button" onClick={handleDownvote} />
    </div>
  );
};

export default VoteInput;
