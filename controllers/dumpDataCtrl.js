const express = require('express');
const router = express.Router();

const db = require('../models');


router.get('/', (req, res) => {
    db.UserData.find({}, (err, allData) => {
        if (err) return res.json({status: 500, error: 'Unable to find data - Try Again'})
        res.json(allData)
    })
});

module.exports = router;