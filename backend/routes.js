const router = require('express').Router();

const userController = require('./controllers/user');
const DispenserController = require('./controllers/dispenser');
const PrescriptionController = require('./controllers/prescription');
const ArduinoController = require('./controllers/arduino');

const { isAuth } = require('./middleware/token')

router
    // User routes
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/logout', userController.logout)

    // Dispenser routes
    .post('/dispenser', isAuth, DispenserController.create)
    .get('/dispensers', isAuth, DispenserController.getAll)
    .get('/dispensers/search', isAuth, DispenserController.search)

    // Prescription routes
    .post('/prescription', isAuth, PrescriptionController.create)
    .get('/prescriptions', isAuth, PrescriptionController.getAll)
    .get('/prescription/:id', isAuth, PrescriptionController.getbyId)
    .delete('/prescription/:id', isAuth, PrescriptionController.deactivate)

    // Arduino routes
    .get('/dispenser-prescription/:serialNumber', ArduinoController.getInstructionsForDispenser)
    .get('/reminder/:serialNumber', ArduinoController.sendReminder)



module.exports = router; 