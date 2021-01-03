import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db.js';

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user.js';
import { AppointmentQuery, AppointmentMutation } from './appointment.js';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...AppointmentQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...AppointmentMutation,
});

export default schemaComposer.buildSchema();