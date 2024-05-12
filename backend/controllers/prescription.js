const mongoose = require('mongoose');
const Prescription = require('../models/prescription');


exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json(prescriptions);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};

