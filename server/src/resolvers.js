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
        async signup(root, {
            input
        }) {
            console.log(input.password);
            input.password = await bcrypt.hash(input.password, 10);

            const user = await User.create(input);

            const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

            return {
                token,
                user
            };
        },

        async login(root, {
            email, password
        }) {
            const user = await User.findOne({
                email: email
            });

            if (!user) {
                throw new Error('No such user found');
            }

            const pwd = await bcrypt.hash(password, 10);
            console.log(pwd);
            console.log(user.password);

            const valid = await bcrypt.compare(
                password,
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

        async createAppointment(root, {
            input
        }) {
            return await Appointment.create(input);
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