const {Schema, model} = require('mongoose');

const DispenserSchema = new Schema(
    {
        serialNumber: {
            type: String,
            required: true,
            unique: true
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
