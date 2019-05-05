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
    .then(allCities => res.json({allCities}));
});

// GET '/:cityURL'
// // Find the one city and res.json its info
router.get('/:cityURL', (req, res) => {
  const cityName = req.params.cityURL || '';
  db.City.findOne({cityURL: cityName})
    .catch(err => console.log('Error: ', err))
    .then(foundCity => {
      if (!foundCity) {
        return res.json({errors: [{messages: 'City not found!'}]})
      }
      return res.json({foundCity, success: true})
    });
});

module.exports = router;