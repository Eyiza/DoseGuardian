const Prescription = require('../models/prescription');
const Dispenser = require('../models/dispenser');
const { mailService } = require('../middleware/mailService');
const reminderEmailTemplate = require('../template/email_reminder');



exports.getInstructionsForDispenser = async (req, res) => {
    try {
      const serialNumber = req.params.serialNumber;
  
      const dispenser = await Dispenser.findOne({serialNumber});
      if (!dispenser) {
        return res.status(404).json({ error: 'Dispenser not found' });
      }
  
      const prescription = await Prescription.findOne({dispenserSerialNumber: serialNumber});
  
      if (!prescription) return res.status(200).json({ success: true, message: "No active prescription found for this dispenser" });
  
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


exports.sendReminder = async (req, res) => {
    try {
      const serialNumber = req.params.serialNumber;

        const dispenser = await Dispenser.findOne({serialNumber});
        if (!dispenser) {
          return res.status(404).json({ error: 'Dispenser not found' });
        }

        const prescription = await Prescription.findOne({dispenserSerialNumber: serialNumber, status: "active"});
        if (!prescription) return res.status(404).json({ success: false, message: "No active prescription found for this dispenser" });

        const { medications, contact: {email} } = prescription;
        const { name: medicationName, dosage, interval } = medications[0];
        
        const emailTemplate = reminderEmailTemplate(medicationName, dosage, interval);

        mailService(process.env.EMAILUSER, email, emailTemplate.subject, emailTemplate.text, emailTemplate.html);

        return res.status(200).json({
          success: true,
          message: "Reminder sent successfully"
        });
        
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
};
  