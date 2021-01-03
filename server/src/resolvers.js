import Product from './models/product.js';

export const resolvers = {
    Query: {
        async allProducts() {
            const products = await Product.find();
            console.log("Tah!", products);
            return products;
            // return {
            //     products
            // };
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