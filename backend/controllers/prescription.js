const Prescription = require('../models/prescription');

exports.create = async (req, res) => {
    try {
        const { medications, duration, alertMessage, contact, dispenserSerialNumber } = req.body;

        const prescription = new Prescription({
          user: req.userData.user._id,
          medications,
          duration,
          alertMessage,
          contact,
          dispenserSerialNumber
        });

        await prescription.save();

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
        const prescriptions = await Prescription.find();
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

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findByIdAndDelete(id);

    if (!prescription) {
      return res.status(400).json({ message: "Prescription Not Found!" });
    }
    return res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });

  } catch (error) {
        console.log(error)
        res.status(500).json(error.message);
  }
        
}