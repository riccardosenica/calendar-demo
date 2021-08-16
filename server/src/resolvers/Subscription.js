function newAppointmentSubscribe(parent, args, context) {
  return context.pubsub.asyncIterator("NEW_APPOINTMENT");
}

const newAppointment = {
  subscribe: newAppointmentSubscribe,
  resolve: payload => payload,
};

function newFollowSubscribe(parent, args, context) {
  return context.pubsub.asyncIterator("NEW_FOLLOW");
}

const newFollow = {
  subscribe: newFollowSubscribe,
  resolve: payload => payload,
};

module.exports = {
  newAppointment,
  newFollow
};