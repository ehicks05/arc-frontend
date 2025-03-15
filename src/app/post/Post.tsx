import {
  AuthDialog,
  Button,
  Card,
  CommentCreateForm,
  Comments,
  Loading,
  PostStub,
} from '@/components';
import {
  CommentSort,
  useDeletePostMutation,
  usePostQuery,
} from '@/generated/graphql';
import { useUser } from '@/hooks';
import { sortBy } from 'lodash';
import { useState } from 'react';
import { CgSleep } from 'react-icons/cg';
import { useModal } from 'react-modal-hook';
import { useParams } from 'react-router-dom';
import CommentSortSelect from './CommentSortSelect';
import PostEditForm from './PostEditForm';
import { toForest } from './utils';

const Post = () => {
  const { user } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const params = useParams();
  const id = params.id || '';
  const [editMode, setEditMode] = useState(false);
  const [isEditTopLevelComment, setIsEditTopLevelComment] = useState(true);

  const [commentSort, setCommentSort] = useState<CommentSort>(CommentSort.Best);

  const [deletePost] = useDeletePostMutation();
  const {
    data,
    previousData,
    loading,
    error,
    refetch: refetchPost,
  } = usePostQuery({
    variables: { id },
  });
  const post = data?.post || previousData?.post;
  const comments = sortBy(post?.comments, c =>
    commentSort === CommentSort.Best
      ? c.score.score
      : commentSort === CommentSort.Top
        ? c.netVotes
        : commentSort === CommentSort.New
          ? c.createdAt
          : c.score.score,
  ).reverse();

  const handleClickDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await deletePost({ variables: { input: { id } } });
      await refetchPost();
    }
  };

  if (post) {
    const isAuthor = user?.id === post.author?.id;

    return (
      <div className="flex flex-col gap-4 w-full sm:max-w-screen-lg max-w-prose mx-auto">
        <div>
          <PostStub post={post} />
          <div className="p-2 border-y dark:border-gray-800">
            <div className="flex flex-col gap-5 text-sm">
              {!editMode &&
                post.content.split(/\n\n/).map(p => (
                  <p key={p} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
            </div>

            {editMode && <PostEditForm post={post} setEditMode={setEditMode} />}
            {!editMode && !post.deleted && user?.id === post.author?.id && (
              <div className="flex text-xs pt-1 gap-4">
                <Button
                  disabled={!isAuthor}
                  onClick={user ? () => setEditMode(!editMode) : showAuthModal}
                >
                  Edit
                </Button>
                <Button
                  disabled={!isAuthor}
                  onClick={
                    user ? () => handleClickDelete(post.id) : showAuthModal
                  }
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-start">
          {!isEditTopLevelComment && (
            <div className="flex w-full justify-between">
              <Button
                className="text-sm"
                onClick={() => setIsEditTopLevelComment(true)}
              >
                Leave a comment
              </Button>
              <CommentSortSelect
                value={commentSort}
                onChange={setCommentSort}
              />
            </div>
          )}
          {isEditTopLevelComment && (
            <div className="flex w-full flex-col gap-4">
              <CommentCreateForm
                postId={post.id}
                refetchPost={refetchPost}
                setEditMode={setIsEditTopLevelComment}
              />
              <CommentSortSelect
                value={commentSort}
                onChange={setCommentSort}
              />
            </div>
          )}
        </div>

        {comments.length !== 0 && (
          <Comments comments={toForest(comments)} refetchPost={refetchPost} />
        )}
        {comments.length === 0 && (
          <Card>
            <CgSleep size={128} />
            No comments found.
          </Card>
        )}
      </div>
    );
  }

  if (loading || error) return <Loading error={error} />;
  if (!post) return <div>Post not found...</div>;
  return null;
};

export default Post;
