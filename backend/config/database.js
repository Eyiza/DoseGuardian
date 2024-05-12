const mongoose = require('mongoose');
require('dotenv').config()

async function connect() {
    const mongoDBURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_NAME}.bpmm9a4.mongodb.net/`
    
    mongoose.connect(mongoDBURI);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
    console.log('Connected to MongoDB!');
    });
}
    
module.exports = connect;
