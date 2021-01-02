function appointments(parent, args, context) {
  return context.mongo.user
    .findUnique({ where: { id: parent.id } })
    .appointments();
}

module.exports = {
  appointments
};
