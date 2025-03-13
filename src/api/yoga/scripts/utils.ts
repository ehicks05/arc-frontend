import { faker } from '@faker-js/faker';
import type { Comment, User } from '@prisma/client';
import { sample, sampleSize } from 'lodash-es';
import prisma from '../lib/prisma';

export const adminNuke = async () => {
  await prisma.comment.deleteMany();
  await prisma.commentScore.deleteMany();
  await prisma.post.deleteMany();
  await prisma.postScore.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userCommentVote.deleteMany();
  await prisma.userPostVote.deleteMany();
};

const POST_COUNT = 80;
const USER_COUNT = 100;
const MAX_COMMENTS_PER_POST = 50;
const MAX_VOTES_PER_POST = USER_COUNT;
const MAX_VOTES_PER_COMMENT = USER_COUNT / 10;

const createUsers = async () => {
  const data = [...Array(USER_COUNT)].map(() => {
    const username = faker.internet.userName();
    return { id: username, username };
  });
  await prisma.user.createMany({ data });
  return prisma.user.findMany();
};

const createPosts = async (users: User[]) => {
  await prisma.post.createMany({
    data: [...Array(POST_COUNT)].map(() => ({
      title: faker.hacker.phrase(),
      content: faker.lorem.paragraphs(),
      link: 'https://www.google.com',
      authorId: sample(users)?.id,
    })),
  });
  const posts = await prisma.post.findMany();
  await prisma.postScore.createMany({
    data: posts.map(p => ({ postId: p.id, score: 0 })),
  });
  return posts;
};

export const adminSeed = async () => {
  console.log('creating users...');
  const users = await createUsers();

  console.log('creating posts and postScores...');
  const posts = await createPosts(users);

  console.log('for each post, creating comments and commentScores...');
  const commentPromises = posts.map(async p => {
    const comments: Comment[] = [];
    const commentsForThisPost = Math.random() * MAX_COMMENTS_PER_POST;
    while (comments.length < commentsForThisPost) {
      // aim for 25% to be roots, 75% to be children
      const isChild = comments.length > 0 && Math.random() > 0.25;
      const parent = isChild ? sample(comments) : undefined;
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.paragraphs(Math.round(Math.random() * 10)),
          postId: p.id,
          authorId: sample(users)?.id,
          parentCommentId: parent?.id,
          level: parent ? parent.level + 1 : 0,
        },
      });
      comments.push(comment);
    }
  });
  await Promise.all(commentPromises);
  const comments = await prisma.comment.findMany();
  await prisma.commentScore.createMany({
    data: comments.map(c => ({ commentId: c.id, score: 0 })),
  });

  const UPVOTE_RATIO = Math.random() / 2 + 0.5; // targeting 0.5-1.0

  console.log('for each post, creating userPostVotes...');
  const userPostVoteData = posts.flatMap(p => {
    const voters = sampleSize(users, Math.random() * MAX_VOTES_PER_POST);
    return voters.map(u => ({
      postId: p.id,
      userId: u.id,
      direction: Math.random() <= UPVOTE_RATIO ? 1 : -1,
    }));
  });
  await prisma.userPostVote.createMany({ data: userPostVoteData });

  console.log('for each comment, creating userCommentVotes...');
  const userCommentVoteData = comments.flatMap(c => {
    const voters = sampleSize(users, Math.random() * MAX_VOTES_PER_COMMENT);
    return voters.map(u => ({
      commentId: c.id,
      userId: u.id,
      direction: Math.random() <= UPVOTE_RATIO ? 1 : -1,
    }));
  });
  await prisma.userCommentVote.createMany({ data: userCommentVoteData });

  await prisma.$executeRaw`call updatescore();`;
  return prisma.post.findMany();
};
