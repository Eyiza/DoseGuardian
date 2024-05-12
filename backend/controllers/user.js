require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);


exports.register = async (req, res) => {
    try {
        const { username, email, password, } = req.body;

        const hashedPassword = await bcrypt.hashSync(password, bcryptSalt)

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password : hashedPassword,
        })

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Account Created",
            user
        })
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            return res.status(400).json({ message: "Username is already chosen" });
        }        
      console.log(error)
      res.status(500).json(error);
  }
};


