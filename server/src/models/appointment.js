import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const AppointmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        timeStart: {
            type: Date,
            required: true,
        },

        timeEnd: {
            type: Date,
            required: true,
        },
    },
    {
        collection: 'appointment',
    }
);

AppointmentSchema.plugin(timestamps);

AppointmentSchema.index({ createdAt: 1, updatedAt: 1 });

export const Appointment = mongoose.model('Appointment', AppointmentSchema);
export const AppointmentTC = composeWithMongoose(Appointment);