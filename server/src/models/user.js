import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
        },

        isActive: {
            type: Boolean,
            required: true,
            default: 1
        },
    },
    {
        collection: 'users',
    }
);

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);