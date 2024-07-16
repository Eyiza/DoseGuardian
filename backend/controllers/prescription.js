const Prescription = require('../models/prescription');
const Dispenser = require('../models/dispenser');

exports.create = async (req, res) => {
    try {
        const { medications, duration, alertMessage, contact, dispenserSerialNumber } = req.body;

        // Check if dispenser exists and is available
        const dispenser = await Dispenser.findOne({ serialNumber: dispenserSerialNumber });
        if (!dispenser) return res.status(404).json({ success: false, message: "Dispenser not found" });
        if (!dispenser.available) return res.status(400).json({ success: false, message: "Dispenser is not available" });

        if (!medications || medications.length === 0) return res.status(400).json({ success: false, message: "Medications are required" });

        // If length of medications is not equal to the number of layers in dispenser
        if (medications.length !== dispenser.layers) return res.status(400).json({ success: false, message: "Number of medications should be equal to the number of layers in dispenser" });5

        const prescription = new Prescription({
          user: req.userData.user._id,
          medications,
          duration,
          alertMessage,
          contact,
          dispenserSerialNumber
        });

        await prescription.save();

        // Update dispenser status
        await Dispenser.findOneAndUpdate({ serialNumber: dispenserSerialNumber }, { available: false });

        return res.status(200).json({
            success: true,
            message: "Prescription created successfully",
            prescription
        })
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
    try {
        const prescriptions = await Prescription.find().sort({ createdAt: -1 });
        return res.status(200).json({
          success: true,
          message: "Prescription found",
          prescriptions,
          count: prescriptions.length
      });
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};

exports.getbyId = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).json({ success: false, message: "Prescription not found" });
    return res.status(200).json({
      success: true,
      message: "Prescription found",
      prescription
      });
      
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

exports.deactivate = async (req, res) => {
  try {
    const { id } = req.params;
    
    const prescription = await Prescription.findById(id);
    if (!prescription) return res.status(404).json({ success: false, message: "Prescription not found" });

    prescription.active = false;
    await prescription.save();

    // Update dispenser status
    await Dispenser.findOneAndUpdate({ serialNumber: prescription.dispenserSerialNumber }, { available: true });
    
    return res.status(200).json({
      success: true,
      message: "Prescription deactivated successfully",
    });

  } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
  }
        
}