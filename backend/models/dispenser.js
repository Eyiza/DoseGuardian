const {Schema, model} = require('mongoose');

const DispenserSchema = new Schema(
    {
        serialNumber: {
            type: String,
            required: true,
            unique: true
        },
        layers: {
            type: Number,
            required: true
        },
        drugType: {
            type: String,
            enum: ['tablet', 'capsule', 'liquid'],
            required: true
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model('Dispenser', DispenserSchema);
