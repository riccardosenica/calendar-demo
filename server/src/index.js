import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
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

// app.get('/', (req, res) => {
//   res.json({
//     msg: 'GraphQL home!'
//   })
// });

app.use('/djhb58fytkh476dk45yh49', graphqlHTTP({
  schema: schema,
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
  context: async ({ req }) => {
    //     if (!db) {
    //       try {
    //         if (!dbClient.isConnected()) await dbClient.connect()
    //         mongo = dbClient.db('Calendar') // database name
    //         console.log(db);
    //       } catch (e) {
    //         console.log('--->error while connecting with graphql context (db)', e)
    //       }

    return {
      ...req,
      mongoose,
      pubsub,
      // userId:
      //   req && req.headers.authorization
      //     ? getUserId(req)
      //     : null
    }
  },
  // subscriptions: {
  //   onConnect: (connectionParams) => {
  //     if (connectionParams.authToken) {
  //       return {
  //         mongoose,
  //         userId: getUserId(
  //           null,
  //           connectionParams.authToken
  //         )
  //       };
  //     } else {
  //       return {
  //         mongoose
  //       };
  //     }
  //   }
  // },
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
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});






// const { ApolloServer, PubSub } = require('apollo-server');
// // const { Cors } = require('cors');
// // const { Express } = require('express');

// const express = require("express");
// const { graphqlHTTP } = require('express-graphql');
// const mongoose = require("mongoose");
// const graphqlSchema = require("./graphql/schema/schema")
// const appointmentResolvers = require("./graphql/resolvers/appointment")
// const userResolvers = require("./graphql/resolvers/user")

// var MongoClient = require('mongodb', { useUnifiedTopology: true }).MongoClient;
// // import { MongoClient } from 'mongodb'
// const Query = require('./resolvers/Query');
// const Mutation = require('./resolvers/Mutation');
// const Subscription = require('./resolvers/Subscription');
// const User = require('./resolvers/User');
// const Appointment = require('./resolvers/Appointment');
// const Follow = require('./resolvers/Follow');
// const fs = require('fs');
// const path = require('path');
// const { getUserId } = require('./utils');

// const pubsub = new PubSub();

// const app = express()

// const graphqlResolvers = {
//   appointmentResolvers,
//   userResolvers
// };

// // const resolvers = {
// //   Query,
// //   Mutation,
// //   Subscription,
// //   User,
// //   Appointment,
// //   Follow
// // };
