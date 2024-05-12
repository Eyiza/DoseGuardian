require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const {generateToken} = require('../middleware/token.js');


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


exports.login = async (req, res) => {
    try {        
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Sorry, the email was not found. Please try again.'});
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password. Please try again.'});
        }

        const { _id,  username } = user;

        const token = generateToken({
            user: { 
                _id, username, email
            }
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })

    } catch (error) {
      console.log(error)
      res.status(500).json(error);
  }
};


