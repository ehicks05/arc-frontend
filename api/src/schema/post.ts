import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { builder } from '../builder';
import { CommentSort, PostSort, PostSortKey } from './basic';

// TODO: move
const PAGE_SIZE = 10;

const sortToOrderBy: Record<
  PostSortKey,
  Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>
> = {
  HOT: { postScore: { score: 'desc' } },
  TOP: { netVotes: 'desc' },
  NEW: { createdAt: 'desc' },
};

builder.prismaObject('Post', {
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    link: t.exposeString('link'),
    content: t.exposeString('content'),
    deleted: t.exposeBoolean('deleted'),
    author: t.relation('author'),
    comments: t.relation('comments', {
      args: {
        commentSort: t.arg({ type: CommentSort }),
      },
      query: ({ commentSort }) => ({
        orderBy:
          commentSort === 'BEST'
            ? { commentScore: { score: 'desc' } }
            : commentSort === 'TOP'
            ? { netVotes: 'desc' }
            : commentSort === 'NEW'
            ? { createdAt: 'desc' }
            : { commentScore: { score: 'desc' } },
      }),
    }),
    commentCount: t.relationCount('comments'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    netVotes: t.exposeInt('netVotes'), // previous version was doing a queryRaw with getNetVotes
    score: t.relation('postScore'),
    userVote: t.prismaField({
      type: 'UserPostVote',
      nullable: true,
      resolve: async (query, root, args, { userId }) => {
        if (!userId) return null;

        const where = { userId_postId: { userId, postId: root.id } };
        return prisma.userPostVote.findUnique({ where });
      },
    }),
  }),
});

builder.prismaObject('PostScore', {
  fields: t => ({
    id: t.exposeID('id'),
    post: t.relation('post'),
    score: t.exposeFloat('score'),
  }),
});

builder.queryField('posts', t =>
  t.prismaField({
    type: ['Post'],
    args: {
      sort: t.arg({ type: PostSort }),
      offset: t.arg.int(),
    },
    resolve: async (query, root, args) => {
      const { sort, offset } = args;
      const skip = offset || 0;
      const orderBy = sortToOrderBy[sort || 'HOT'];
      return prisma.post.findMany({ ...query, skip, take: PAGE_SIZE, orderBy });
    },
  }),
);

builder.queryField('post', t =>
  t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) =>
      prisma.post.findUniqueOrThrow({ ...query, where: { id: args.id } }),
  }),
);

const createPostInput = builder.inputType('createPostInput', {
  fields: t => ({
    title: t.string({ required: true }),
    link: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField('createPost', t =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: createPostInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('Author is required');

      const { title, link, content } = args.input;
      const data = {
        author: { connect: { id: userId } },
        postScore: { create: { score: 0 } },
        title,
        link,
        content,
      };
      return prisma.post.create({ ...query, data });
    },
  }),
);

const updatePostInput = builder.inputType('updatePostInput', {
  fields: t => ({
    id: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});

builder.mutationField('updatePost', t =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: updatePostInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('Author is required');
      const { id, content } = args.input;

      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) throw new Error('post not found');
      if (post.authorId !== userId)
        throw new Error('you can only update your own posts');

      return prisma.post.update({ ...query, where: { id }, data: { content } });
    },
  }),
);

const deletePostInput = builder.inputType('deletePostInput', {
  fields: t => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationField('deletePost', t =>
  t.prismaField({
    type: 'Post',
    args: {
      input: t.arg({ type: deletePostInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('Author is required');
      const { id } = args.input;

      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) throw new Error('post not found');
      if (post.authorId !== userId)
        throw new Error('you can only delete your own posts');

      return prisma.post.update({
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
