import Product from './models/product.js';
// import User from './resolvers/User.js';
// import Appointment from './resolvers/Appointment.js';
// import Follow from './resolvers/Follow.js';
// import Query from './resolvers/Query.js';
// import Mutation from './resolvers/Mutation.js';
// import Subscription from './resolvers/Subscription.js';
export const resolvers = {
    Query: {
        async allProducts() {
            return await Product.find();
        },

        // async feed(parent, args, context, info) {

        //     const where = args.filter
        //         ? {
        //             OR: [
        //                 { title: { contains: args.filter } },
        //                 { description: { contains: args.filter } }
        //             ]
        //         }
        //         : {};
        //     console.log(context.mongo);
        //     const appointments = await context.mongo.appointment.findMany({
        //         where,
        //         skip: args.skip,
        //         take: args.take,
        //         orderBy: args.orderBy
        //     });

        //     const count = await context.mongo.appointment.count({ where });

        //     return {
        //         id: 'main-feed',
        //         appointments,
        //         count
        //     };
        // }
    }
};