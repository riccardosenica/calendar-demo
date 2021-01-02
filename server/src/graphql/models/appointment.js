const mongoose = require("mongoose")

const Schema = mongoose.Schema

const appointmentSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        timeStart: {
            type: Date,
            required: true,
        },

        timeEnd: {
            type: Date,
            required: true,
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("Appointment", appointmentSchema)