function createdBy(parent, args, context) {
  return context.mongo.appointment
    .findUnique({ where: { id: parent.id } })
    .createdBy();
}

function follows(parent, args, context) {
  return context.mongo.appointment
    .findUnique({ where: { id: parent.id } })
    .follows();
}

module.exports = {
  createdBy,
  follows
};
