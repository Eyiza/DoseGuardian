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
    .post('/dispenser', isAuth, DispenserController.create)
    .get('/dispensers', isAuth, DispenserController.getAll)
    .get('/dispensers/search', isAuth, DispenserController.search)





module.exports = router; 