import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db.js';

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user.js';
import { TaskQuery, TaskMutation } from './task.js';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...TaskQuery,
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...TaskMutation,
});

export default schemaComposer.buildSchema();