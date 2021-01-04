// import Appointment from '../../client/src/components/Appointment.js';
import Product from './models/product.js';
import Appointment from './models/appointment.js';

export const resolvers = {
    Query: {
        async allProducts() {
            return await Product.find();
        },
        async allAppointments() {
            return await Appointment.find();
        },
    },
    Mutation: {
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