import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['String'];
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  level: Scalars['Int'];
  netVotes: Scalars['Int'];
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['String']>;
  post: Post;
  postId: Scalars['String'];
  score: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userVote: UserCommentVote;
};

export enum CommentSort {
  Best = 'BEST',
  New = 'NEW',
  Top = 'TOP'
}

export enum Direction {
  Down = 'DOWN',
  Up = 'UP'
}

export type Mutation = {
  __typename?: 'Mutation';
  adminNuke?: Maybe<Post>;
  adminSeed?: Maybe<Array<Maybe<Post>>>;
  createComment?: Maybe<Comment>;
  createPost?: Maybe<Post>;
  createUserCommentVote?: Maybe<Comment>;
  createUserPostVote?: Maybe<Post>;
  deleteComment?: Maybe<Comment>;
  deletePost?: Maybe<Post>;
  deleteUser?: Maybe<User>;
  deleteUserCommentVote?: Maybe<Comment>;
  deleteUserPostVote?: Maybe<Post>;
  setUsername?: Maybe<Scalars['String']>;
  updateComment?: Maybe<Comment>;
  updatePost?: Maybe<Post>;
};


export type MutationCreateCommentArgs = {
  input?: InputMaybe<CreateCommentInput>;
};


export type MutationCreatePostArgs = {
  input?: InputMaybe<CreatePostInput>;
};


export type MutationCreateUserCommentVoteArgs = {
  input?: InputMaybe<CreateUserCommentVoteInput>;
};


export type MutationCreateUserPostVoteArgs = {
  input?: InputMaybe<CreateUserPostVoteInput>;
};


export type MutationDeleteCommentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeletePostArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteUserCommentVoteArgs = {
  commentId?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteUserPostVoteArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};


export type MutationSetUsernameArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCommentArgs = {
  input?: InputMaybe<UpdateCommentInput>;
};


export type MutationUpdatePostArgs = {
  input?: InputMaybe<UpdatePostInput>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['String'];
  commentCount: Scalars['Int'];
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  id: Scalars['ID'];
  link: Scalars['String'];
  netVotes: Scalars['Int'];
  score: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userVote: UserPostVote;
};


export type PostCommentsArgs = {
  commentSort?: InputMaybe<CommentSort>;
};

export type Query = {
  __typename?: 'Query';
  getCommentById?: Maybe<Comment>;
  getComments?: Maybe<Array<Maybe<Comment>>>;
  getMe?: Maybe<User>;
  getPostById?: Maybe<Post>;
  getPosts: Array<Post>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetCommentByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetPostByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetPostsArgs = {
  sort?: InputMaybe<Sort>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum Sort {
  Hot = 'HOT',
  New = 'NEW',
  Top = 'TOP'
}

/** A User... */
export type User = {
  __typename?: 'User';
  commentVotes: Array<UserCommentVote>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  /** username */
  id: Scalars['ID'];
  postVotes: Array<UserPostVote>;
  posts: Array<Post>;
  updatedAt: Scalars['DateTime'];
};

export type UserCommentVote = {
  __typename?: 'UserCommentVote';
  comment: Comment;
  commentId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  direction: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type UserPostVote = {
  __typename?: 'UserPostVote';
  createdAt: Scalars['DateTime'];
  direction: Scalars['Int'];
  post: Post;
  postId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type CreateCommentInput = {
  content?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
  parentCommentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
};

export type CreatePostInput = {
  content?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateUserCommentVoteInput = {
  commentId?: InputMaybe<Scalars['String']>;
  direction: Direction;
};

export type CreateUserPostVoteInput = {
  direction: Direction;
  postId?: InputMaybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type UpdatePostInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type CommentFragment = { __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } };

export type CreateCommentMutationVariables = Exact<{
  input?: InputMaybe<CreateCommentInput>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } } | null };

export type UpdateCommentMutationVariables = Exact<{
  input?: InputMaybe<UpdateCommentInput>;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } } | null };

export type DeleteCommentMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } } | null };

export type PostFragment = { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } };

export type GetPostsQueryVariables = Exact<{
  sort?: InputMaybe<Sort>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } }> };

export type GetPostByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  commentSort?: InputMaybe<CommentSort>;
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById?: { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, comments: Array<{ __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } }>, userVote: { __typename?: 'UserPostVote', direction: number } } | null };

export type CreatePostMutationVariables = Exact<{
  input?: InputMaybe<CreatePostInput>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } } | null };

export type UpdatePostMutationVariables = Exact<{
  input?: InputMaybe<UpdatePostInput>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } } | null };

export type DeletePostMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } } | null };

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, posts: Array<{ __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } }>, comments: Array<{ __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, post: { __typename?: 'Post', id: string, title: string, link: string, authorId: string, netVotes: number, commentCount: number, createdAt: any, updatedAt: any }, userVote: { __typename?: 'UserCommentVote', direction: number } }> } | null };

export type CreateUserPostVoteMutationVariables = Exact<{
  input: CreateUserPostVoteInput;
}>;


export type CreateUserPostVoteMutation = { __typename?: 'Mutation', createUserPostVote?: { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } } | null };

export type DeleteUserPostVoteMutationVariables = Exact<{
  postId?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteUserPostVoteMutation = { __typename?: 'Mutation', deleteUserPostVote?: { __typename?: 'Post', id: string, title: string, link: string, content: string, deleted: boolean, createdAt: any, updatedAt: any, authorId: string, commentCount: number, netVotes: number, score: number, userVote: { __typename?: 'UserPostVote', direction: number } } | null };

export type CreateUserCommentVoteMutationVariables = Exact<{
  input: CreateUserCommentVoteInput;
}>;


export type CreateUserCommentVoteMutation = { __typename?: 'Mutation', createUserCommentVote?: { __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } } | null };

export type DeleteUserCommentVoteMutationVariables = Exact<{
  commentId?: InputMaybe<Scalars['ID']>;
}>;


export type DeleteUserCommentVoteMutation = { __typename?: 'Mutation', deleteUserCommentVote?: { __typename?: 'Comment', id: string, postId: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, authorId: string, parentCommentId?: string | null, score: number, netVotes: number, userVote: { __typename?: 'UserCommentVote', direction: number } } | null };

export type SetUsernameMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
}>;


export type SetUsernameMutation = { __typename?: 'Mutation', setUsername?: string | null };

export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  postId
  content
  deleted
  level
  createdAt
  updatedAt
  authorId
  parentCommentId
  score
  netVotes
  userVote {
    direction
  }
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  link
  content
  deleted
  createdAt
  updatedAt
  authorId
  commentCount
  netVotes
  score
  userVote {
    direction
  }
}
    `;
export const CreateCommentDocument = gql`
    mutation createComment($input: createCommentInput) {
  createComment(input: $input) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($input: updateCommentInput) {
  updateComment(input: $input) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: ID) {
  deleteComment(id: $id) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts($sort: Sort) {
  getPosts(sort: $sort) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($id: ID, $commentSort: CommentSort) {
  getPostById(id: $id) {
    ...Post
    comments(commentSort: $commentSort) {
      ...Comment
    }
  }
}
    ${PostFragmentDoc}
${CommentFragmentDoc}`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      commentSort: // value for 'commentSort'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: createPostInput) {
  createPost(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($input: updatePostInput) {
  updatePost(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID) {
  deletePost(id: $id) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID) {
  getUser(id: $id) {
    id
    posts {
      ...Post
    }
    comments {
      ...Comment
      post {
        id
        title
        link
        authorId
        netVotes
        commentCount
        createdAt
        updatedAt
      }
    }
  }
}
    ${PostFragmentDoc}
${CommentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserPostVoteDocument = gql`
    mutation createUserPostVote($input: createUserPostVoteInput!) {
  createUserPostVote(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type CreateUserPostVoteMutationFn = Apollo.MutationFunction<CreateUserPostVoteMutation, CreateUserPostVoteMutationVariables>;

/**
 * __useCreateUserPostVoteMutation__
 *
 * To run a mutation, you first call `useCreateUserPostVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserPostVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserPostVoteMutation, { data, loading, error }] = useCreateUserPostVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserPostVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserPostVoteMutation, CreateUserPostVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserPostVoteMutation, CreateUserPostVoteMutationVariables>(CreateUserPostVoteDocument, options);
      }
export type CreateUserPostVoteMutationHookResult = ReturnType<typeof useCreateUserPostVoteMutation>;
export type CreateUserPostVoteMutationResult = Apollo.MutationResult<CreateUserPostVoteMutation>;
export type CreateUserPostVoteMutationOptions = Apollo.BaseMutationOptions<CreateUserPostVoteMutation, CreateUserPostVoteMutationVariables>;
export const DeleteUserPostVoteDocument = gql`
    mutation deleteUserPostVote($postId: ID) {
  deleteUserPostVote(postId: $postId) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export type DeleteUserPostVoteMutationFn = Apollo.MutationFunction<DeleteUserPostVoteMutation, DeleteUserPostVoteMutationVariables>;

/**
 * __useDeleteUserPostVoteMutation__
 *
 * To run a mutation, you first call `useDeleteUserPostVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserPostVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserPostVoteMutation, { data, loading, error }] = useDeleteUserPostVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteUserPostVoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserPostVoteMutation, DeleteUserPostVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserPostVoteMutation, DeleteUserPostVoteMutationVariables>(DeleteUserPostVoteDocument, options);
      }
export type DeleteUserPostVoteMutationHookResult = ReturnType<typeof useDeleteUserPostVoteMutation>;
export type DeleteUserPostVoteMutationResult = Apollo.MutationResult<DeleteUserPostVoteMutation>;
export type DeleteUserPostVoteMutationOptions = Apollo.BaseMutationOptions<DeleteUserPostVoteMutation, DeleteUserPostVoteMutationVariables>;
export const CreateUserCommentVoteDocument = gql`
    mutation createUserCommentVote($input: createUserCommentVoteInput!) {
  createUserCommentVote(input: $input) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type CreateUserCommentVoteMutationFn = Apollo.MutationFunction<CreateUserCommentVoteMutation, CreateUserCommentVoteMutationVariables>;

/**
 * __useCreateUserCommentVoteMutation__
 *
 * To run a mutation, you first call `useCreateUserCommentVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserCommentVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserCommentVoteMutation, { data, loading, error }] = useCreateUserCommentVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserCommentVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserCommentVoteMutation, CreateUserCommentVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserCommentVoteMutation, CreateUserCommentVoteMutationVariables>(CreateUserCommentVoteDocument, options);
      }
export type CreateUserCommentVoteMutationHookResult = ReturnType<typeof useCreateUserCommentVoteMutation>;
export type CreateUserCommentVoteMutationResult = Apollo.MutationResult<CreateUserCommentVoteMutation>;
export type CreateUserCommentVoteMutationOptions = Apollo.BaseMutationOptions<CreateUserCommentVoteMutation, CreateUserCommentVoteMutationVariables>;
export const DeleteUserCommentVoteDocument = gql`
    mutation deleteUserCommentVote($commentId: ID) {
  deleteUserCommentVote(commentId: $commentId) {
    ...Comment
  }
}
    ${CommentFragmentDoc}`;
export type DeleteUserCommentVoteMutationFn = Apollo.MutationFunction<DeleteUserCommentVoteMutation, DeleteUserCommentVoteMutationVariables>;

/**
 * __useDeleteUserCommentVoteMutation__
 *
 * To run a mutation, you first call `useDeleteUserCommentVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserCommentVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserCommentVoteMutation, { data, loading, error }] = useDeleteUserCommentVoteMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteUserCommentVoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserCommentVoteMutation, DeleteUserCommentVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserCommentVoteMutation, DeleteUserCommentVoteMutationVariables>(DeleteUserCommentVoteDocument, options);
      }
export type DeleteUserCommentVoteMutationHookResult = ReturnType<typeof useDeleteUserCommentVoteMutation>;
export type DeleteUserCommentVoteMutationResult = Apollo.MutationResult<DeleteUserCommentVoteMutation>;
export type DeleteUserCommentVoteMutationOptions = Apollo.BaseMutationOptions<DeleteUserCommentVoteMutation, DeleteUserCommentVoteMutationVariables>;
export const SetUsernameDocument = gql`
    mutation setUsername($username: String) {
  setUsername(username: $username)
}
    `;
export type SetUsernameMutationFn = Apollo.MutationFunction<SetUsernameMutation, SetUsernameMutationVariables>;

/**
 * __useSetUsernameMutation__
 *
 * To run a mutation, you first call `useSetUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsernameMutation, { data, loading, error }] = useSetUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSetUsernameMutation(baseOptions?: Apollo.MutationHookOptions<SetUsernameMutation, SetUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUsernameMutation, SetUsernameMutationVariables>(SetUsernameDocument, options);
      }
export type SetUsernameMutationHookResult = ReturnType<typeof useSetUsernameMutation>;
export type SetUsernameMutationResult = Apollo.MutationResult<SetUsernameMutation>;
export type SetUsernameMutationOptions = Apollo.BaseMutationOptions<SetUsernameMutation, SetUsernameMutationVariables>;