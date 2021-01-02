// const { default: Appointment } = require("../../../../client/src/components/Appointment")
const { newAppointment } = require("../../resolvers/Subscription")
const Appointment = require("../models/appointment")

module.exports = {
    findAppointments: async () => {
        try {
            const appointmentsFetched = await Appointment.find()
            return appointmentsFetched.map(appointment => {
                return {
                    ...this.appointment._doc,
                    _id: appointment.id,
                    createdAt: new Date(appointment._doc.createdAt).toISOString(),
                }
            })
        } catch (error) {
            throw error
        }
    },

    createAppointment: async args => {
        try {
            const { title, description, timeStart, timeEnd } = args.appointment
            const appointment = new Appointment({
                title,
                description,
                timeStart,
                timeEnd
            })
            const newAppointment = await appointment.save()
            return { ...newAppointment._doc, _id: newAppointment.id }
        } catch (error) {
            throw error
        }
    },
}