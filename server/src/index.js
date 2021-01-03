import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import mongoose from 'mongoose';
import './utils/db.js';
import schema from './schema/index.js';

dotenv.config();

const app = express();
const pubsub = new PubSub();

const server = new ApolloServer({
  schema,
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
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    }
  },
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
