import Appointment from './models/appointment.js';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import { createAppointment } from './resolvers/Mutation';

export const resolvers = {
    Query: {
        async allAppointments() {
            return await Appointment.find({ deleted: false });
        },
        async oneAppointment(root, args) {
            return await Appointment.findOne({
                _id: args._id
            });
        },
        async allUsers() {
            return await User.find();
        },
    },
    Mutation: {
        async signup(root, args) {
            const user = await User.create(args);
            user.password = user.generateHash(args.password);
            user.save();

            const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

            return {
                token,
                user
            };
        },

        async login(parent, args) {
            const user = await User.findOne({
                email: args.email
            });
            if (!user) {
                throw new Error('No such user found');
            }

            if (!user.validPassword(args.password)) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

            return {
                token,
                user
            };
        },

        async createAppointment(parent, args, context) {
            return await createAppointment(parent, args, context);
        },
        async updateAppointment(parent, args) {
            return await Appointment.findOneAndUpdate({
                args
            }, args, {
                new: true
            });
        }
    }
};