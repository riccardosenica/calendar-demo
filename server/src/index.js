import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import depthLimit from 'graphql-depth-limit'
import { ApolloServer, PubSub } from 'apollo-server-express';
import mongoose from 'mongoose';
import schema from './schema.js';
import './utils/db.js';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
const app = express();
const pubsub = new PubSub();

dotenv.config();

app.use(cors());

app.use('/djhb58fytkh476dk45yh49', graphqlHTTP({
  schema: schema,
  validationRules: [depthLimit(3)],
  graphiql: true
}));

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  cors: true,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  context: ({ req }) => {
    return {
      ...req,
      mongoose,
      pubsub
    }
  },
  introspection: true,
  tracing: true,
  path: '/',
});

server.applyMiddleware({
  app,
  path: '/',
  cors: true,
  onHealthCheck: () =>
    new Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
