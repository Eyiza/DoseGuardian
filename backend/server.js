const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');

//middlewares
app.use(cors());
// app.use(cors({origin: "*"}))
app.use(express.urlencoded({extended: true }))
app.use(express.json())

//::::::Import Routes
const routes = require('./routes');

//::::Routes
app.get('/', (req, res) => {
    return res.status(200).send(`Welcome to DoseGuardian API`);
});
app.use(routes);

//:::::: Connect to MongoDB
const connect = require('./config/mongodb');
connect();

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
