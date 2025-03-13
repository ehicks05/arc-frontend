import { writeFileSync } from 'node:fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import './schema/index';
import { builder } from './builder';

const schema = builder.toSchema();

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync('./src/generated/schema.graphql', schemaAsString);

export { schema };
