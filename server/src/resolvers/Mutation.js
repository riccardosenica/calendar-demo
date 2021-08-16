const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

function createAppointment(parent, args, context) {
  const { userId } = context;

  const newAppointment = context.mongo.appointment.create({
    data: {
      title: args.title,
      description: args.description,
      createdBy: { connect: { id: userId } }
    }
  });

  return newAppointment;
}

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.mongo.user.create({
    data: { ...args, password }
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context) {
  const user = await context.mongo.user.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(
    args.password,
    user.password
  );
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function follow(parent, args, context) {
  const { userId } = context;
  const follow = await context.mongo.follow.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId
      }
    }
  });

  if (follow) {
    throw new Error(
      `Already followed the appointment: ${args.linkId}`
    );
  }

  const newFollow = context.mongo.follow.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } }
    }
  });
  context.pubsub.publish('NEW_FOLLOW', newFollow);

  return newFollow;
}

module.exports = {
  createAppointment,
  signup,
  login,
  follow
};
