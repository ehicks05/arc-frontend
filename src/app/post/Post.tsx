import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from 'react-modal-hook';
import { CgSleep } from 'react-icons/cg';
import {
  CommentSort,
  useDeletePostMutation,
  useGetPostByIdQuery,
} from '@/generated/graphql';
import {
  AuthDialog,
  CommentCreateForm,
  Comments,
  PostStub,
  Button,
  Loading,
  Card,
} from '@/components';
import { useUser } from '@/hooks';
import { toForest } from './utils';
import PostEditForm from './PostEditForm';
import CommentSortSelect from './CommentSortSelect';

const Post = () => {
  const { user } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const { id } = useParams();
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
  } = useGetPostByIdQuery({
    variables: { id, commentSort },
  });
  const post = data?.getPostById || previousData?.getPostById;

  useEffect(() => {
    const effect = async () => refetchPost({ id, commentSort });
    effect();
  }, [id, commentSort, refetchPost]);

  const handleClickDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await deletePost({ variables: { id } });
      await refetchPost();
    }
  };

  if (post) {
    const isAuthor = user?.id === post.authorId;

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
            {!editMode && !post.deleted && user?.id === post.authorId && (
              <div className="flex text-xs pt-1 gap-4">
                <Button
                  disabled={!isAuthor}
                  onClick={user ? () => setEditMode(!editMode) : showAuthModal}
                >
                  Edit
                </Button>
                <Button
                  disabled={!isAuthor}
                  onClick={user ? () => handleClickDelete(post.id) : showAuthModal}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex">
          {!isEditTopLevelComment && (
            <Button
              className="text-sm"
              onClick={() => setIsEditTopLevelComment(true)}
            >
              Leave a comment
            </Button>
          )}
          {isEditTopLevelComment && (
            <CommentCreateForm
              postId={post.id}
              refetchPost={refetchPost}
              setEditMode={setIsEditTopLevelComment}
            />
          )}
        </div>

        <CommentSortSelect value={commentSort} onChange={setCommentSort} />
        {post.comments && (
          <Comments comments={toForest(post.comments)} refetchPost={refetchPost} />
        )}
        {post.comments.length === 0 && (
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
