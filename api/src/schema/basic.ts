import { DateTimeResolver } from 'graphql-scalars';
import { builder } from '../builder';

builder.queryType({});
builder.mutationType({});
builder.addScalarType('DateTime', DateTimeResolver, {});

const POST_SORTS = ['HOT', 'TOP', 'NEW'] as const;
export type PostSortKey = (typeof POST_SORTS)[number];
export const PostSort = builder.enumType('PostSort', {
  values: POST_SORTS,
});

const COMMENT_SORTS = ['BEST', 'TOP', 'NEW'] as const;
export const CommentSort = builder.enumType('CommentSort', {
  values: COMMENT_SORTS,
});
