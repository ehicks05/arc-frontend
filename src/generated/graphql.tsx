import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  netVotes: Scalars['Int']['output'];
  parentComment?: Maybe<Comment>;
  post: Post;
  score: CommentScore;
  updatedAt: Scalars['DateTime']['output'];
  userVote?: Maybe<UserCommentVote>;
};

export type CommentScore = {
  __typename?: 'CommentScore';
  comment: Comment;
  id: Scalars['ID']['output'];
  score: Scalars['Float']['output'];
};

export enum CommentSort {
  Best = 'BEST',
  New = 'NEW',
  Top = 'TOP'
}

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUserCommentVote: UserCommentVote;
  createUserPostVote: UserPostVote;
  deleteComment: Comment;
  deletePost: Post;
  deleteUser: User;
  deleteUserCommentVote: UserCommentVote;
  deleteUserPostVote: UserPostVote;
  setUsername: User;
  updateComment: Comment;
  updatePost: Post;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateUserCommentVoteArgs = {
  input: CreateUserCommentVoteInput;
};


export type MutationCreateUserPostVoteArgs = {
  input: CreateUserPostVoteInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDeleteUserCommentVoteArgs = {
  input: DeleteUserCommentVoteInput;
};


export type MutationDeleteUserPostVoteArgs = {
  input: DeleteUserPostVoteInput;
};


export type MutationSetUsernameArgs = {
  input: SetUsernameInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  commentCount: Scalars['Int']['output'];
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  netVotes: Scalars['Int']['output'];
  score: PostScore;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userVote?: Maybe<UserPostVote>;
};


export type PostCommentsArgs = {
  commentSort?: InputMaybe<CommentSort>;
};

export type PostScore = {
  __typename?: 'PostScore';
  id: Scalars['ID']['output'];
  post: Post;
  score: Scalars['Float']['output'];
};

export enum PostSort {
  Hot = 'HOT',
  New = 'NEW',
  Top = 'TOP'
}

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  /** @deprecated unused? */
  comments: Array<Comment>;
  me?: Maybe<User>;
  post: Post;
  posts: Array<Post>;
  test: Scalars['String']['output'];
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommentsArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<CommentSort>;
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
};


export type QueryPostsArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<PostSort>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  commentVotes: Array<UserCommentVote>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  postVotes: Array<UserPostVote>;
  posts: Array<Post>;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type UserCommentVote = {
  __typename?: 'UserCommentVote';
  comment: Comment;
  direction: Scalars['Int']['output'];
  user: User;
};

export type UserPostVote = {
  __typename?: 'UserPostVote';
  direction: Scalars['Int']['output'];
  post: Post;
  user: User;
};

export enum VoteDirection {
  Down = 'DOWN',
  Up = 'UP'
}

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  parentCommentId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  link: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserCommentVoteInput = {
  commentId: Scalars['String']['input'];
  direction: VoteDirection;
};

export type CreateUserPostVoteInput = {
  direction: VoteDirection;
  postId: Scalars['String']['input'];
};

export type DeleteCommentInput = {
  id: Scalars['String']['input'];
};

export type DeletePostInput = {
  id: Scalars['String']['input'];
};

export type DeleteUserCommentVoteInput = {
  commentId: Scalars['String']['input'];
};

export type DeleteUserInput = {
  id: Scalars['String']['input'];
};

export type DeleteUserPostVoteInput = {
  postId: Scalars['String']['input'];
};

export type SetUsernameInput = {
  username: Scalars['String']['input'];
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type UpdatePostInput = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
};

export type CommentFragment = { __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null } };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null } };

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null } };

export type PostStubFragment = { __typename?: 'Post', id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null };

export type PostDetailFragment = { __typename?: 'Post', content: string, id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, comments: Array<{ __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null }>, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null };

export type PostsQueryVariables = Exact<{
  sort?: InputMaybe<PostSort>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null }> };

export type PostQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', content: string, id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, comments: Array<{ __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null }>, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', content: string, id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', content: string, id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null } };

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username?: string | null, posts: Array<{ __typename?: 'Post', content: string, id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, comments: Array<{ __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null }>, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null }>, comments: Array<{ __typename?: 'Comment', id: string, content: string, deleted: boolean, level: number, createdAt: any, updatedAt: any, netVotes: number, post: { __typename?: 'Post', id: string, title: string, link: string, deleted: boolean, createdAt: any, updatedAt: any, commentCount: number, netVotes: number, author: { __typename?: 'User', id: string, username?: string | null }, score: { __typename?: 'PostScore', score: number }, userVote?: { __typename?: 'UserPostVote', direction: number } | null }, author: { __typename?: 'User', id: string, username?: string | null }, parentComment?: { __typename?: 'Comment', id: string } | null, score: { __typename?: 'CommentScore', score: number }, userVote?: { __typename?: 'UserCommentVote', direction: number } | null }> } | null };

export type CreateUserPostVoteMutationVariables = Exact<{
  input: CreateUserPostVoteInput;
}>;


export type CreateUserPostVoteMutation = { __typename?: 'Mutation', createUserPostVote: { __typename?: 'UserPostVote', post: { __typename?: 'Post', id: string, netVotes: number, userVote?: { __typename?: 'UserPostVote', direction: number } | null } } };

export type DeleteUserPostVoteMutationVariables = Exact<{
  input: DeleteUserPostVoteInput;
}>;


export type DeleteUserPostVoteMutation = { __typename?: 'Mutation', deleteUserPostVote: { __typename?: 'UserPostVote', post: { __typename?: 'Post', id: string, netVotes: number, userVote?: { __typename?: 'UserPostVote', direction: number } | null } } };

export type CreateUserCommentVoteMutationVariables = Exact<{
  input: CreateUserCommentVoteInput;
}>;


export type CreateUserCommentVoteMutation = { __typename?: 'Mutation', createUserCommentVote: { __typename?: 'UserCommentVote', comment: { __typename?: 'Comment', id: string, netVotes: number, userVote?: { __typename?: 'UserCommentVote', direction: number } | null } } };

export type DeleteUserCommentVoteMutationVariables = Exact<{
  input: DeleteUserCommentVoteInput;
}>;


export type DeleteUserCommentVoteMutation = { __typename?: 'Mutation', deleteUserCommentVote: { __typename?: 'UserCommentVote', comment: { __typename?: 'Comment', id: string, netVotes: number, userVote?: { __typename?: 'UserCommentVote', direction: number } | null } } };

export type SetUsernameMutationVariables = Exact<{
  input: SetUsernameInput;
}>;


export type SetUsernameMutation = { __typename?: 'Mutation', setUsername: { __typename?: 'User', id: string, username?: string | null } };

export const PostStubFragmentDoc = gql`
    fragment PostStub on Post {
  id
  title
  link
  deleted
  createdAt
  updatedAt
  author {
    id
    username
  }
  commentCount
  netVotes
  score {
    score
  }
  userVote {
    direction
  }
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  post {
    id
  }
  content
  deleted
  level
  createdAt
  updatedAt
  author {
    id
    username
  }
  parentComment {
    id
  }
  score {
    score
  }
  netVotes
  userVote {
    direction
  }
}
    `;
export const PostDetailFragmentDoc = gql`
    fragment PostDetail on Post {
  ...PostStub
  content
  comments {
    ...Comment
  }
}
    ${PostStubFragmentDoc}
${CommentFragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation createComment($input: createCommentInput!) {
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
    mutation updateComment($input: updateCommentInput!) {
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
    mutation deleteComment($input: deleteCommentInput!) {
  deleteComment(input: $input) {
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
 *      input: // value for 'input'
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
export const PostsDocument = gql`
    query Posts($sort: PostSort, $offset: Int) {
  posts(sort: $sort, offset: $offset) {
    ...PostStub
  }
}
    ${PostStubFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export function usePostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsSuspenseQueryHookResult = ReturnType<typeof usePostsSuspenseQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    ...PostDetail
  }
}
    ${PostDetailFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export function usePostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostSuspenseQueryHookResult = ReturnType<typeof usePostSuspenseQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: createPostInput!) {
  createPost(input: $input) {
    ...PostStub
    content
  }
}
    ${PostStubFragmentDoc}`;
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
    mutation updatePost($input: updatePostInput!) {
  updatePost(input: $input) {
    ...PostStub
    content
  }
}
    ${PostStubFragmentDoc}`;
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
    mutation deletePost($input: deletePostInput!) {
  deletePost(input: $input) {
    ...PostStub
  }
}
    ${PostStubFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    id
    username
    posts {
      ...PostDetail
    }
    comments {
      ...Comment
      post {
        ...PostStub
      }
    }
  }
}
    ${PostDetailFragmentDoc}
${CommentFragmentDoc}
${PostStubFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const CreateUserPostVoteDocument = gql`
    mutation createUserPostVote($input: createUserPostVoteInput!) {
  createUserPostVote(input: $input) {
    post {
      id
      netVotes
      userVote {
        direction
      }
    }
  }
}
    `;
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
    mutation deleteUserPostVote($input: deleteUserPostVoteInput!) {
  deleteUserPostVote(input: $input) {
    post {
      id
      netVotes
      userVote {
        direction
      }
    }
  }
}
    `;
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
 *      input: // value for 'input'
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
    comment {
      id
      netVotes
      userVote {
        direction
      }
    }
  }
}
    `;
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
    mutation deleteUserCommentVote($input: deleteUserCommentVoteInput!) {
  deleteUserCommentVote(input: $input) {
    comment {
      id
      netVotes
      userVote {
        direction
      }
    }
  }
}
    `;
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
 *      input: // value for 'input'
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
    mutation setUsername($input: setUsernameInput!) {
  setUsername(input: $input) {
    id
    username
  }
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
 *      input: // value for 'input'
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