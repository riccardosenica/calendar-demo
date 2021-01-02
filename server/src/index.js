const { ApolloServer, PubSub } = require('apollo-server');
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

// const mongo = new MongoClient({
//   errorFormat: 'minimal'
// });

const mongo = MongoClient.connect("mongodb+srv://admin:hEbAjhvkrFDHAP3@cluster0.0hjtt.mongodb.net/Calendar?retryWrites=true&w=majority", function (err, db) {

  if (err) throw err;
  console.log("ALL good");
  //Write databse Insert/Update/Query code here..

});

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Appointment,
  Follow
};

let db;

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  // context: async () => {
  //   if (!db) {
  //     try {
  //       const dbClient = new MongoClient(
  //         'mongodb+srv://test:qwerty123@cluster0-yvwjx.mongodb.net/next-graphql?retryWrites=true&w=majority',
  //         {
  //           useNewUrlParser: true,
  //           useUnifiedTopology: true,
  //         }
  //       )

  //       if (!dbClient.isConnected()) await dbClient.connect()
  //       db = dbClient.db('next-graphql') // database name
  //     } catch (e) {
  //       console.log('--->error while connecting with graphql context (db)', e)
  //     }
  //   }

  //   return { db }
  // },
  context: ({ req }) => {
    return {
      ...req,
      mongo,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          mongo,
          userId: getUserId(
            null,
            connectionParams.authToken
          )
        };
      } else {
        return {
          mongo
        };
      }
    }
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
