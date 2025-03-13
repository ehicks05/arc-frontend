import prisma from '../prisma';
import { builder } from '../builder';
import { CommentSort } from './basic';

builder.prismaObject('Comment', {
  fields: t => ({
    id: t.exposeID('id'),
    content: t.exposeString('content'),
    deleted: t.exposeBoolean('deleted'),
    level: t.exposeInt('level'),
    author: t.relation('author'),
    post: t.relation('post'),
    parentComment: t.relation('parentComment', { nullable: true }),
    comments: t.relation('comments'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    netVotes: t.exposeInt('netVotes'), // previous version was doing a queryRaw with getNetVotes
    score: t.relation('commentScore'),
    userVote: t.prismaField({
      type: 'UserCommentVote',
      nullable: true,
      resolve: async (query, root, args, { userId }) => {
        if (!userId) return null;
        const where = { userId_commentId: { userId, commentId: root.id } };
        return prisma.userCommentVote.findUnique({ ...query, where });
      },
    }),
  }),
});

builder.prismaObject('CommentScore', {
  fields: t => ({
    id: t.exposeID('id'),
    comment: t.relation('comment'),
    score: t.exposeFloat('score'),
  }),
});

builder.queryField('comments', t =>
  t.prismaField({
    deprecationReason: 'unused?',
    type: ['Comment'],
    args: {
      sort: t.arg({ type: CommentSort }),
      offset: t.arg.int(),
    },
    resolve: async query => prisma.comment.findMany({ ...query }),
  }),
);

builder.queryField('comment', t =>
  t.prismaField({
    type: 'Comment',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) =>
      prisma.comment.findUniqueOrThrow({ ...query, where: { id: args.id } }),
  }),
);

const createCommentInput = builder.inputType('createCommentInput', {
  fields: t => ({
    postId: t.string({ required: true }),
    parentCommentId: t.string(),
    level: t.int({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField('createComment', t =>
  t.prismaField({
    type: 'Comment',
    args: {
      input: t.arg({ type: createCommentInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('Author is required');

      const { postId, parentCommentId, level, content } = args.input;
      const data = {
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
        parentComment: parentCommentId
          ? { connect: { id: parentCommentId } }
          : undefined,
        commentScore: { create: { score: 0 } },
        level,
        content,
      };
      return prisma.comment.create({ ...query, data });
    },
  }),
);

const updateCommentInput = builder.inputType('updateCommentInput', {
  fields: t => ({
    id: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField('updateComment', t =>
  t.prismaField({
    type: 'Comment',
    args: {
      input: t.arg({ type: updateCommentInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('Author is required');
      const { id, content } = args.input;

      const comment = await prisma.comment.findUnique({ where: { id } });
      if (!comment) throw new Error('comment not found');
      if (comment.authorId !== userId)
        throw new Error('you can only update your own comments');

      return prisma.comment.update({ ...query, where: { id }, data: { content } });
    },
  }),
);

const deleteCommentInput = builder.inputType('deleteCommentInput', {
  fields: t => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationField('deleteComment', t =>
  t.prismaField({
    type: 'Comment',
    args: {
      input: t.arg({ type: deleteCommentInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('Author is required');
      const { id } = args.input;

      const comment = await prisma.comment.findUnique({ where: { id } });
      if (!comment) throw new Error('comment not found');
      if (comment.authorId !== userId)
        throw new Error('you can only delete your own comments');

      return prisma.comment.update({
        ...query,
        where: { id },
        data: {
          deleted: true,
          content: '[Deleted]',
          // author: { disconnect: true },
        },
      });
    },
  }),
);
