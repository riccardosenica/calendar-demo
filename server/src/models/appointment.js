import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    deleted: {
        type: Boolean,
        required: false
    }
});
export default mongoose.model('appointment', AppointmentSchema);