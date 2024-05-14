const Dispenser = require('../models/dispenser');

exports.create = async (req, res) => {
    try {
        const { serialNumber, layers, drugType } = req.body;

        const dispenser = new Dispenser({ serialNumber, layers, drugType });

        await dispenser.save();

        return res.status(200).json({
            success: true,
            message: "Dispenser created successfully",
            dispenser
        })
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.serialNumber) {
            return res.status(400).json({ message: "Serial Number already exists" });
        }
        if (error.name === 'ValidationError' && error.errors && error.errors.drugType) {
            return res.status(400).json({ message: "Provided Drug type is not supported. Please select a supported type." });
        } 
      console.log(error)
      res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
    try {
        const dispensers = await Dispenser.find();
        return res.status(200).json({
            success: true,
            message: "Dispensers found",
            dispensers,
            count: dispensers.length
        });
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};


exports.search = async (req, res) => {
    try {
        const { layers, drugType } = req.query;
        const dispensers = await Dispenser.find({ layers, drugType, available: true});

        if (dispensers.length === 0) {
            return res.status(404).json({ success: false, message: "No dispensers available for provided description" });
        }
        return res.status(200).json({
            success: true,
            message: "Dispensers found",
            dispensers,
            count: dispensers.length
        });
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};
