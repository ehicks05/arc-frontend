import { CommentFragment } from '@/generated/graphql';

export interface HydratedComment extends CommentFragment {
  commentForest?: HydratedComment[];
}
