const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// API Url
const CITIES_URL = '/api/v1/cities';

// ------------ Routes ----------- //
// GET '/'
// // res.json all cities
router.get('/', (req, res) => {
  db.City.find({})
    .catch(err => console.log(err))
    .then(allCities => res.json({data: allCities}));
});

// GET '/:cityURL'
// // Find the one city and res.json its info

module.exports = router;