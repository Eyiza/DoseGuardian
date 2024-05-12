const mongoose = require('mongoose');
const Dispenser = require('../models/dispenser');


exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json(prescriptions);
    } catch (error) {
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


