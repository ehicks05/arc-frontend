import { sum } from 'lodash-es';
import { builder } from '../builder';
import prisma from '../lib/prisma';

const VOTE_DIRECTIONS = ['UP', 'DOWN'] as const;
const DIRECTION_TO_VALUE = { UP: 1, DOWN: -1 };

const VoteDirection = builder.enumType('VoteDirection', {
  values: VOTE_DIRECTIONS,
});

builder.prismaObject('UserPostVote', {
  fields: t => ({
    user: t.relation('user'),
    post: t.relation('post'),
    direction: t.exposeInt('direction'),
  }),
});
builder.prismaObject('UserCommentVote', {
  fields: t => ({
    user: t.relation('user'),
    comment: t.relation('comment'),
    direction: t.exposeInt('direction'),
  }),
});

const createUserPostVoteInput = builder.inputType('createUserPostVoteInput', {
  fields: t => ({
    postId: t.string({ required: true }),
    direction: t.field({ type: VoteDirection, required: true }),
  }),
});

builder.mutationField('createUserPostVote', t =>
  t.prismaField({
    type: 'UserPostVote',
    args: {
      input: t.arg({ type: createUserPostVoteInput, required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error('userId is required');

      const { postId, direction: directionArg } = args.input;
      const direction = DIRECTION_TO_VALUE[directionArg];

      const userPostVote = await prisma.userPostVote.upsert({
        ...query,
        where: { userId_postId: { userId, postId } },
        update: { direction },
        create: {
          user: { connect: { id: userId } },
          post: { connect: { id: postId } },
          direction,
        },
      });
      const votes = await prisma.userPostVote.findMany({ where: { postId } });
      const netVotes = sum(votes.map(v => v.direction));
      const post = await prisma.post.update({
        where: { id: postId },
        data: { netVotes },
      });
      return { ...userPostVote, post };
    },
  }),
);

const deleteUserPostVoteInput = builder.inputType('deleteUserPostVoteInput', {
  fields: t => ({
    postId: t.string({ required: true }),
  }),
});

builder.mutationField('deleteUserPostVote', t =>
  t.prismaField({
    type: 'UserPostVote',
    args: {
      input: t.arg({ type: deleteUserPostVoteInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('userId is required');

      const { postId } = args.input;

      const userPostVote = await prisma.userPostVote.delete({
        ...query,
        where: { userId_postId: { userId, postId } },
        include: { post: true },
      });
      const votes = await prisma.userPostVote.findMany({ where: { postId } });
      const netVotes = sum(votes.map(v => v.direction));
      const post = await prisma.post.update({
        where: { id: postId },
        data: { netVotes },
      });
      return { ...userPostVote, post };
    },
  }),
);

const createUserCommentVoteInput = builder.inputType(
  'createUserCommentVoteInput',
  {
    fields: t => ({
      commentId: t.string({ required: true }),
      direction: t.field({ type: VoteDirection, required: true }),
    }),
  },
);

builder.mutationField('createUserCommentVote', t =>
  t.prismaField({
    type: 'UserCommentVote',
    args: {
      input: t.arg({ type: createUserCommentVoteInput, required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error('userId is required');

      const { commentId, direction: directionArg } = args.input;
      const direction = DIRECTION_TO_VALUE[directionArg];

      const userCommentVote = await prisma.userCommentVote.upsert({
        ...query,
        where: { userId_commentId: { userId, commentId } },
        update: { direction },
        create: {
          user: { connect: { id: userId } },
          comment: { connect: { id: commentId } },
          direction,
        },
      });
      const votes = await prisma.userCommentVote.findMany({
        where: { commentId },
      });
      const netVotes = sum(votes.map(v => v.direction));
      const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { netVotes },
      });
      return { ...userCommentVote, comment };
    },
  }),
);

const deleteUserCommentVoteInput = builder.inputType(
  'deleteUserCommentVoteInput',
  {
    fields: t => ({
      commentId: t.string({ required: true }),
    }),
  },
);

builder.mutationField('deleteUserCommentVote', t =>
  t.prismaField({
    type: 'UserCommentVote',
    args: {
      input: t.arg({ type: deleteUserCommentVoteInput, required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error('userId is required');

      const { commentId } = args.input;

      const userCommentVote = await prisma.userCommentVote.delete({
        ...query,
        where: { userId_commentId: { userId, commentId } },
      });
      const votes = await prisma.userCommentVote.findMany({
        where: { commentId },
      });
      const netVotes = sum(votes.map(v => v.direction));
      const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { netVotes },
      });
      return { ...userCommentVote, comment };
    },
  }),
);
