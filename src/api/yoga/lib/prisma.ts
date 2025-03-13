import { type Prisma, PrismaClient } from '@prisma/client';
// import { formatQuery } from 'prisma-query-formatter';

const logQueries = false;

const options: Prisma.PrismaClientOptions = logQueries
  ? {
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    }
  : {};

const prisma = new PrismaClient(options);

// if (logQueries) {
//   prisma.$on('query', e => {
//     console.log(formatQuery(e.query, e.params));
//   });
// }

export default prisma;
