const {Schema, model} = require('mongoose');

const PrescriptionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        medications: [{
            box_no: Number,
            name: String,
            dosage: Number,
            interval: Number
        }],
        duration: Number,
        alertMessage: String,
        contact: {
            phoneNumber: String,
            email: String
        },
        dispenserSerialNumber: String,
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = model('Prescription', PrescriptionSchema);
