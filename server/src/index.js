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
import jwt from 'jsonwebtoken';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
const app = express();
const pubsub = new PubSub();

dotenv.config();

function getTokenPayload(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated');
}

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  validationRules: [depthLimit(3)],
  graphiql: true
}));

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  // schema,
  cors: true,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  context: ({ req }) => ({
      ...req,
      mongoose,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }),
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          mongoose,
          userId: getUserId(
            null,
            connectionParams.authToken
          )
        };
      } else {
        return {
          mongoose
        };
      }
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
    // eslint-disable-next-line no-undef
    new Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});

app.listen({ port: process.env.PORT }, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
