const jwt = require("jsonwebtoken");
require('dotenv').config()

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


// Generate Token
exports.generateToken = function (payload) {
    const token =  jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
        });

    return token;
};


exports.isAuth = function (req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userData = decoded;

        next();
    } catch (err){
        return res.status(401).json({
            status: 'bad',
            error: "Unauthorized",
            message: 'Session Expired. Please log in'
        });
    }
};