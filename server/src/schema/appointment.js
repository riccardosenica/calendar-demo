import { Appointment, AppointmentTC } from '../models/appointment.js';

async function feed(parent, args, context, info) {

    const where = args.filter
        ? {
            OR: [
                { title: { contains: args.filter } },
                { description: { contains: args.filter } }
            ]
        }
        : {};
    console.log(context.mongo);
    const appointments = await context.mongo.appointment.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    });

    const count = await context.mongo.appointment.count({ where });

    return {
        id: 'main-feed',
        appointments,
        count
    };
}

const AppointmentQuery = {
    appointmentById: AppointmentTC.getResolver('findById'),
    appointmentByIds: AppointmentTC.getResolver('findByIds'),
    appointmentOne: AppointmentTC.getResolver('findOne'),
    appointmentMany: AppointmentTC.getResolver('findMany'),
    appointmentCount: AppointmentTC.getResolver('count'),
    appointmentConnection: AppointmentTC.getResolver('connection'),
    appointmentPagination: AppointmentTC.getResolver('pagination'),
};

const AppointmentMutation = {
    appointmentCreateOne: AppointmentTC.getResolver('createOne'),
    appointmentCreateMany: AppointmentTC.getResolver('createMany'),
    appointmentUpdateById: AppointmentTC.getResolver('updateById'),
    appointmentUpdateOne: AppointmentTC.getResolver('updateOne'),
    appointmentUpdateMany: AppointmentTC.getResolver('updateMany'),
    appointmentRemoveById: AppointmentTC.getResolver('removeById'),
    appointmentRemoveOne: AppointmentTC.getResolver('removeOne'),
    appointmentRemoveMany: AppointmentTC.getResolver('removeMany'),
};

export { AppointmentQuery, AppointmentMutation };