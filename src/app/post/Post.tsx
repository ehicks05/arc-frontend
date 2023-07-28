import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from 'react-modal-hook';
import clsx from 'clsx';
import * as Select from '@radix-ui/react-select';
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

const Post = () => {
  const { user } = useUser();
  const [showAuthModal, hideModal] = useModal(() => (
    <AuthDialog isOpen hideModal={hideModal} />
  ));
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [showTopLevelReply, setShowTopLevelReply] = useState(false);

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

        <div className="flex px-2">
          {!showTopLevelReply && (
            <Button onClick={() => setShowTopLevelReply(true)}>
              Leave a comment
            </Button>
          )}
          {showTopLevelReply && (
            <CommentCreateForm
              postId={post.id}
              refetchPost={refetchPost}
              setEditMode={setShowTopLevelReply}
            />
          )}
        </div>

        <div className="flex px-2">
          <Select.Root onValueChange={v => setCommentSort(v as CommentSort)}>
            <Select.Trigger>
              <Button>
                <Select.Value>
                  <span className="text-sm">Sort</span>
                </Select.Value>
                <Select.Icon className="ml-2 text-xs" />
              </Button>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content position="popper">
                <Select.ScrollUpButton />
                <Select.Viewport>
                  {Object.entries(CommentSort).map(([label, name]) => (
                    <Select.Item
                      className={clsx(
                        'px-4 py-2 text-sm font-medium cursor-pointer text-neutral-600 bg-neutral-100 hover:bg-neutral-200 hover:text-black dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 dark:hover:text-white',
                      )}
                      value={name}
                      key={name}
                    >
                      <Select.ItemText>{label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
                <Select.Arrow />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
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
