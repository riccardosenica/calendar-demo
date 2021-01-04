import fs from 'fs';
import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers.js';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

const typeDefs = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;
