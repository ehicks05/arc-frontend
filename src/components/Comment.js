import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/all";
import { useAuth0 } from "@auth0/auth0-react";

import { Button, Comments, CommentForm, VoteInput } from "./index";
import {
  useDeleteCommentMutation,
  Direction,
  useCreateUserCommentVoteMutation,
  useDeleteUserCommentVoteMutation,
  useGetPostByIdLazyQuery,
} from "../generated/graphql";
import { DIRECTION_TO_VALUE } from "./utils";

const Comment = ({ comment, refetchPost }) => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const [minimized, setMinimized] = useState(comment.deleted);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleClickDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteComment({ variables: { id } });
      await refetchPost();
    }
  };

  const [
    getPostById,
    { refetch: refetchGetPostById, called: calledGetPostById },
  ] = useGetPostByIdLazyQuery({
    variables: { id: comment.postId },
  });

  const [createUserCommentVote] = useCreateUserCommentVoteMutation();
  const [deleteUserCommentVote] = useDeleteUserCommentVoteMutation();

  const handleVote = async (direction) => {
    comment.userVote?.direction &&
    DIRECTION_TO_VALUE[direction] === comment.userVote.direction
      ? await deleteUserCommentVote({
          variables: { commentId: comment.id },
        })
      : await createUserCommentVote({
          variables: { input: { commentId: comment.id, direction } },
        });

    if (refetchPost) refetchPost();
    else {
      if (calledGetPostById) await refetchGetPostById();
      else getPostById();
    }
  };

  const bgClass =
    comment.level % 2 === 0
      ? "bg-gray-50 dark:bg-gray-900"
      : "bg-white dark:bg-black";
  return (
    <div
      className={`${bgClass} p-2 border dark:border-gray-600`}
      key={comment.id}
    >
      <div className="flex gap-2">
        {!minimized && (
          <VoteInput
            netVotes={comment.netVotes}
            direction={comment.userVote?.direction}
            handleUpvote={() => handleVote(Direction.Up)}
            handleDownvote={() => handleVote(Direction.Down)}
          />
        )}
        {minimized && <div className="w-4"></div>}
        <div className="w-full">
          <Header
            comment={comment}
            minimized={minimized}
            setMinimized={setMinimized}
          />
          {!minimized && (
            <>
              <div>{comment.content}</div>
              {!comment.deleted && (
                <div className="flex pt-1 gap-4">
                  <Button
                    className="text-xs"
                    onClick={
                      isAuthenticated
                        ? () => setShowReplyForm(!showReplyForm)
                        : loginWithRedirect
                    }
                  >
                    Reply
                  </Button>
                  <Button
                    disabled={user?.sub !== comment.author.id}
                    className="text-xs"
                    onClick={
                      isAuthenticated
                        ? () => handleClickDelete(comment.id)
                        : loginWithRedirect
                    }
                  >
                    Delete
                  </Button>
                </div>
              )}

              {showReplyForm && (
                <div className="mt-2">
                  <CommentForm
                    postId={comment.postId}
                    parentComment={comment}
                    toggleReplyBox={setShowReplyForm}
                    refetchPost={refetchPost}
                  />
                </div>
              )}

              {comment.commentForest?.length > 0 && (
                <div className="mt-2">
                  <Comments
                    comments={comment.commentForest}
                    refetchPost={refetchPost}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Header = ({ comment, minimized, setMinimized }) => {
  return (
    <div className="flex gap-4">
      <button onClick={() => setMinimized(!minimized)}>
        {minimized ? <FiPlusSquare /> : <FiMinusSquare />}
      </button>
      <Link
        className={`text-xs ${!comment.author && "pointer-events-none"}`}
        to={`/users/${comment?.author?.id}`}
      >
        {comment?.author?.username || "[Deleted]"}
      </Link>
      <TimeAgo
        title={new Date(comment.createdAt)}
        className="text-xs"
        datetime={comment.createdAt}
        opts={{ minInterval: 60 }}
      />
    </div>
  );
};

export default Comment;
