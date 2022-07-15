function createdBy(parent, args, context) {
  return context.mongo.appointment
    .findUnique({ where: { id: parent.id } })
    .createdBy();
}

module.exports = {
  createdBy
};
