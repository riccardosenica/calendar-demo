// const { default: Appointment } = require("../../../../client/src/components/Appointment")
// const { newUser } = require("../../resolvers/Subscription")
const User = require("../models/user")

module.exports = {
    findUsers: async () => {
        try {
            const usersFetched = await User.find()
            return usersFetched.map(user => {
                return {
                    ...this.user._doc,
                    _id: user.id,
                    createdAt: new Date(user._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    createUser: async args => {
        try {
            const { firstName, lastName, email, isActive } = args.user
            const user = new User({
                firstName,
                lastName,
                email,
                isActive
            })
            const newUser = await user.save()
            return { ...newUser._doc, _id: newUser.id }
        } catch (error) {
            throw error
        }
    },
}