function appointment(parent, args, context) {
  return context.mongo.follow
    .findUnique({ where: { id: parent.id } })
    .appointment();
}

function user(parent, args, context) {
  return context.mongo.follow
    .findUnique({ where: { id: parent.id } })
    .user();
}

module.exports = {
  appointment,
  user
};
