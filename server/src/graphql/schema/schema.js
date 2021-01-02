const { buildSchema } = require("graphql")

module.exports = buildSchema(`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isActive: Boolean!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isActive: Boolean!
  }

  type Appointment {
    _id: ID!
    title: String!
    description: String!
    timeStart: Date!
    timeEnd: Date!
    createdAt: String!
  }

  input AppointmentInput {
    title: String!
    description: String!
    timeStart: Date!
    timeEnd: Date!
  }

  type Query {
    findAppointments:[Appointment!]
    findUsers:[User!]!
  }

  type Mutation {
    createAppointment(appointment:AppointmentInput): Appointment
    createUser(user:UserInput): User
  }

  schema {
    query: Query
    mutation: Mutation
  }

  scalar Date
`)