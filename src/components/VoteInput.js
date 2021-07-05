import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
} from "react-icons/all";

const VoteInput = ({ upvoted, downvoted, handleUpvote, handleDownvote }) => {
  const UpInput = upvoted ? BsCaretUpFill : BsCaretUp;
  const DownInput = downvoted ? BsCaretDownFill : BsCaretDown;
  return (
    <div className="flex flex-col align-items-center gap-1">
      <UpInput className="mx-auto" role="button" onClick={handleUpvote} />
      <div className="mx-auto">1230</div>
      <DownInput className="mx-auto" role="button" onClick={handleDownvote} />
    </div>
  );
};

export default VoteInput;
