async function feed(parent, args, context) {

  const where = args.filter
    ? {
      OR: [
        { title: { contains: args.filter } },
        { description: { contains: args.filter } }
      ]
    }
    : {};

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

module.exports = {
  feed
};
