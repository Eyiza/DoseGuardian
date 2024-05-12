const {Schema, model} = require('mongoose');

const PrescriptionSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        medications: [{
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

const PrescriptionModel = model('Prescription', PrescriptionSchema);

module.exports = PrescriptionModel;