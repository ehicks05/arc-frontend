import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import TracingPlugin, {
  wrapResolver,
  isRootField,
} from '@pothos/plugin-tracing';
import prisma from './prisma';

const enableTracing = true;

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: { req: Request; user?: { id: string }; userId?: string };
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
}>({
  plugins: [PrismaPlugin, PrismaUtils, TracingPlugin],
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
  tracing: {
    // Enable tracing for rootFields by default, other fields need to opt in
    default: enableTracing ? config => isRootField(config) : false,
    // Log resolver execution duration
    wrap: (resolver, options, config) =>
      wrapResolver(resolver, (error, duration) => {
        console.log(
          `Executed resolver ${config.parentType}.${config.name} in ${duration}ms`,
        );
      }),
  },
});

export { builder };
