import Appointment from './models/appointment.js';

export const resolvers = {
    Query: {
        async allAppointments() {
            return await Appointment.find({ deleted: false })
        },
        async oneAppointment(root, args, context, info) {
            return await Appointment.findOne({
                _id: args._id
            });
        },
    },
    Mutation: {
        async createAppointment(parent, args, context, info) {
            console.log(context);
            args.deleted = false;
            return await Appointment.create(args);
        },
        async updateAppointment(parent, args, context, info) {
            console.log(args);
            return await Appointment.findOneAndUpdate({
                args
            }, args, {
                new: true
            })
        },
        async deleteAppointment(parent, args, context, info) {
            return await Appointment.findOneAndUpdate({ _id: args._id }, { deleted: true })
        },
    }
};