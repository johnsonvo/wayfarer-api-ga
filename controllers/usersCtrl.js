const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// API Url
const USERS_URL = '/api/v1/users';

// ------------ Routes ----------- //
// GET '/'
// // Don't return all users
// // res.json({error: permission denied})

// GET '/login'
// // Search user db for user
// // hashes and checks password against db
// // If error, res.json the error back to the frontend
// // on success, create session token with username in it
// // on success, res.json success back to the frontend
// // Send the session token to the frontend user

// POST '/signup' 
// // Perform backend, pass along results to frontend
// // Unique username and additional validation

// GET '/profile' 
// // Get the session token from the request to find the username
// // Search the db for that username
// // Return json of the user info, including username but NOT password hash
// // If they are not signed in (no session token), res.json({login: false})
// // React frontend will open login modal if it gets login === false response

// PUT '/profile'
// // For updating the profile
// // Checks session token to get the username
// // The username in the session token also acts as validation they are allowed to edit

module.exports = router;