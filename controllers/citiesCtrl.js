const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// API Url
const CITIES_URL = '/api/v1/cities';

// ------------ Routes ----------- //
// GET '/'
// // res.json all cities

// GET '/:cityURL'
// // Find the one city and res.json its info

module.exports = router;