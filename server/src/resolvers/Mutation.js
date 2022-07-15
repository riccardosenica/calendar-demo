function createAppointment(parent, args, context, info) {
  const newAppointment = context.mongo.appointment.create({
    data: {
      title: args.title,
      description: args.description
    }
  });

  return newAppointment;
}

module.exports = {
  createAppointment
};
