const express = require('express');
const router = express.Router();

const db = require('../models');


router.get('/profile', (req, res) => {

    /*
    Search DB for user

    redirect to login page if user not found

    verify password to see for match

    render profile page

    */
});

module.exports = router;