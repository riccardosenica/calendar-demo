// import Appointment from '../../client/src/components/Appointment.js';
import Product from './models/product.js';
import Appointment from './models/appointment.js';
import User from './models/user.js'
// import { createAppointment } from './resolvers/Mutation.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const resolvers = {
    Query: {
        async allAppointments() {
            return await Appointment.find();
        },
        async allProducts() {
            return await Product.find();
        },
        async allUsers() {
            return await User.find();
        },
    },
    Mutation: {
        async signup(root, args, context, info) {
            console.log(args, args.password);

            args.password = await bcrypt.hash(args.password, 10);

            console.log("pre ", args.password)

            const user = await User.create(args);

            const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

            console.log("post", user.password);

            return {
                token,
                user
            };
        },

        async login(parent, args, context, info) {
            console.log(args);
            const user = await User.findOne({
                email: args.email
            });
            if (!user) {
                throw new Error('No such user found');
            }

            console.log(user.password);

            const valid = await bcrypt.compare(
                args.password,
                user.password
            );
            if (!valid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id }, APP_SECRET);

            return {
                token,
                user
            };
        },

        // async login(parent, args, context, info) {
        //     console.log(args);
        //     const user = await User.findOne({
        //         email: args.email
        //     });

        //     if (!user) {
        //         throw new Error('No such user found');
        //     }

        //     const pwd = await bcrypt.hash(args.password, 10);
        //     console.log(pwd);
        //     console.log(args.password)
        //     console.log(user.password);

        //     const valid = await bcrypt.compare(
        //         args.password,
        //         user.password
        //     );
        //     if (!valid) {
        //         throw new Error('Invalid password');
        //     }

        //     const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

        //     return {
        //         token,
        //         user
        //     };
        // },

        async createAppointment(parent, args, context, info) {
            return await Appointment.create(args);
        },
        async updateAppointment(root, {
            _id,
            input
        }) {
            return await Appointment.findOneAndUpdate({
                _id
            }, input, {
                new: true
            })
        },
        async deleteAppointment(root, {
            _id
        }) {
            return await Product.findOneAndRemove({
                _id
            });
        },
        async createProduct(root, {
            input
        }) {
            return await Product.create(input);
        },
        async updateProduct(root, {
            _id,
            input
        }) {
            return await Product.findOneAndUpdate({
                _id
            }, input, {
                new: true
            })
        },
        async deleteProduct(root, {
            _id
        }) {
            return await Product.findOneAndRemove({
                _id
            });
        },
    }
};