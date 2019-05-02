
const express = require('express');
const router = express.Router();

const db = require('../models');

// get sign up route

// post login route

router.post('/signup', (req, res) => {

    //Validate form data

    //Generate form and hash password

    //Create Object to hold new user data

    db.UserData.create(newUser, (err, newUser) => {
        if (err) return res.json({status: 500, error: 'Unable to save data - Try Again'})
        //if user created succesfully redirect user to profile page or login page
    })
});

module.exports = router;

