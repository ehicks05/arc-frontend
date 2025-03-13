import { z } from 'zod';
import prisma from '../prisma';
import { builder } from '../builder';

builder.prismaObject('User', {
  fields: t => ({
    id: t.exposeID('id'),
    username: t.exposeString('username', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    posts: t.relation('posts'),
    comments: t.relation('comments'),
    postVotes: t.relation('postVotes'),
    commentVotes: t.relation('commentVotes'),
  }),
});

builder.queryField('me', t =>
  t.prismaField({
    type: 'User',
    nullable: true,
    resolve: async (query, root, args, ctx) => {
      const { userId } = ctx;
      if (!userId) return null;
      return prisma.user.findUnique({ ...query, where: { id: userId } });
    },
  }),
);

builder.queryField('users', t =>
  t.prismaField({
    type: ['User'],
    resolve: async (query, root, args, ctx) => prisma.user.findMany({ ...query }),
  }),
);

builder.queryField('user', t =>
  t.prismaField({
    type: 'User',
    nullable: true,
    args: { id: t.arg.string({ required: true }) },
    resolve: async (query, root, args, ctx) =>
      prisma.user.findUnique({
        ...query,
        where: { id: args.id },
      }),
  }),
);

const setUsernameInput = builder.inputType('setUsernameInput', {
  fields: t => ({
    username: t.string({ required: true }),
  }),
});

builder.mutationField('setUsername', t =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: setUsernameInput, required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      const userId = ctx.user?.id;
      if (!userId) throw new Error('userId is required');
      const { username: usernameInput } = args.input;

      // validate length and characters
      const usernameSchema = z
        .string()
        .regex(/^[a-zA-Z0-9-_]*$/)
        .min(3)
        .max(24);

      const parsed = usernameSchema.safeParse(usernameInput);
      if (!parsed.success)
        throw new Error(JSON.parse(parsed.error.message)[0].message);
      const username = parsed.data;

      // validate uniqueness
      const usernameExists = await prisma.user.count({
        where: { username },
      });
      if (usernameExists !== 0) throw new Error('username already exists');

      return prisma.user.upsert({
        ...query,
        where: { id: userId },
        create: { id: userId, username },
        update: { username },
      });
    },
  }),
);

const deleteUserInput = builder.inputType('deleteUserInput', {
  fields: t => ({
    id: t.string({ required: true }),
  }),
});

builder.mutationField('deleteUser', t =>
  t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: deleteUserInput, required: true }),
    },
    resolve: async (query, root, args, { userId }) => {
      if (!userId) throw new Error('userId is required');
      if (userId !== args.input.id)
        throw new Error('You can only delete your own account');

      return prisma.user.update({
        ...query,
        where: { id: args.input.id },
        data: { deleted: true },
      });
    },
  }),
);
