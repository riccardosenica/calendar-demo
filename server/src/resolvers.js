// import Appointment from '../../client/src/components/Appointment.js';
import Product from './models/product.js';
import Appointment from './models/appointment.js';
// import { createAppointment } from './resolvers/Mutation.js';

export const resolvers = {
    Query: {
        async allAppointments() {
            return await Appointment.find();
        },
        async allProducts() {
            return await Product.find();
        },
    },
    Mutation: {
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