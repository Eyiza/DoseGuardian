const router = require('express').Router();

const userController = require('./controllers/user');
const DispenserController = require('./controllers/dispenser');

const { isAuth } = require('./middleware/token')

router
    // User routes
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/logout', userController.logout)


    // Dispenser routes




module.exports = router; 