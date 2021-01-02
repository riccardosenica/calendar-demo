const { ApolloServer, PubSub } = require('apollo-server');
// const { Cors } = require('cors');
// const { Express } = require('express');

const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/schema")
const appointmentResolvers = require("./graphql/resolvers/appointment")
const userResolvers = require("./graphql/resolvers/user")

var MongoClient = require('mongodb', { useUnifiedTopology: true }).MongoClient;
// import { MongoClient } from 'mongodb'
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Appointment = require('./resolvers/Appointment');
const Follow = require('./resolvers/Follow');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');

const pubsub = new PubSub();

const app = express()

const graphqlResolvers = {
  appointmentResolvers,
  userResolvers
};


app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: appointmentResolvers,
    graphiql: true,
  })
)
const uri = `mongodb+srv://admin:hEbAjhvkrFDHAP3@cluster0.0hjtt.mongodb.net/Calendar?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
let db = mongoose
  .connect(uri, options)
  .then(() => app.listen(4000, console.log("Server is running")))
  .catch(error => {
    throw error
  })

// const app = new Express();
// app.use(Cors());

// const mongo = new MongoClient({
//   errorFormat: 'minimal'
// });

// const mongo = MongoClient.connect("mongodb+srv://admin:hEbAjhvkrFDHAP3@cluster0.0hjtt.mongodb.net/Calendar?retryWrites=true&w=majority", function (err, db) {

//   if (err) throw err;
//   console.log("ALL good");
//   //Write databse Insert/Update/Query code here..

// });

// const dbClient = new MongoClient(
//   'mongodb+srv://admin:hEbAjhvkrFDHAP3@cluster0.0hjtt.mongodb.net/Calendar?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// )

// const resolvers = {
//   Query,
//   Mutation,
//   Subscription,
//   User,
//   Appointment,
//   Follow
// };

// let db;

// const server = new ApolloServer({
//   typeDefs: fs.readFileSync(
//     path.join(__dirname, 'schema.graphql'),
//     'utf8'
//   ),
//   resolvers,
//   context: async ({ req }) => {
//     if (!db) {
//       try {
//         if (!dbClient.isConnected()) await dbClient.connect()
//         mongo = dbClient.db('Calendar') // database name
//         console.log(db);
//       } catch (e) {
//         console.log('--->error while connecting with graphql context (db)', e)
//       }
//     }

//     return {
//       ...req,
//       mongo,
//       pubsub,
//       userId:
//         req && req.headers.authorization
//           ? getUserId(req)
//           : null
//     }
//   },
//   // context: ({ req }) => {
//   //   return {
//   //     ...req,
//   //     mongo,
//   //     pubsub,
//   //     userId:
//   //       req && req.headers.authorization
//   //         ? getUserId(req)
//   //         : null
//   //   };
//   // },
//   // subscriptions: {
//   //   onConnect: (connectionParams) => {
//   //     if (connectionParams.authToken) {
//   //       return {
//   //         mongo,
//   //         userId: getUserId(
//   //           null,
//   //           connectionParams.authToken
//   //         )
//   //       };
//   //     } else {
//   //       return {
//   //         mongo
//   //       };
//   //     }
//   //   }
//   // }
// });

// // server.applyMiddleware({ app });

// server
//   .listen()
//   .then(({ url }) =>
//     console.log(`Server is running on ${url}`)
//   );
