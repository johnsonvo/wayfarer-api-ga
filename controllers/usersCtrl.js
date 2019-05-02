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

// POST '/login'
// // POST because creating new session in db
// // Search user db for user
// // hashes and checks password against db
// // If error, res.json the error back to the frontend
// // on success, create session token with username in it
// // on success, res.json success back to the frontend
// // Send the session token to the frontend user

// POST '/signup' - Create User
// // Perform backend validation, pass along results to frontend
// // Todo: Unique username and additional validation
router.post('/signup', (req, res) => {
  // console.log(req.body);
  const errors = []; // Backend validation errors holder

  // Sprint 3 ToDo - add additional validation here

  // if (!req.body.name) {
  //   errors.push({message: 'Please enter your name'});
  // }
  // if (!req.body.username) {
  //   errors.push({message: 'Please enter your username'});
  // }
  if (!req.body.email) {
    errors.push({message: 'Please enter your email'});
  }
  if (!req.body.password) {
    errors.push({message: 'Please enter your password'});
  }
  if (req.body.password !== req.body.password2) {
    errors.push({message: 'Your passwords do not match'});
  }
  if (errors.length) { // If any validation failed, respond with error array
    return res.json({user: req.body, errors}); // 'errors' short for 'errors: errors'
  }
  // All previous validation passed, so creating user...
  const genericError = 'Something went wrong. Please try again';
  bcrypt.genSalt(10)
    .catch(err => res.json({errors: [{message: genericError}], user: req.body, details: err}))
    .then(salt => {
      // Create the hash out of the password and salt
      bcrypt.hash(req.body.password, salt)
        .catch(err => res.json({errors: [{message: genericError}], user: req.body, details: err}))
        .then(hash => {
          // Create the user object to add to the DB
          const userObj = {
            // name: req.body.name,
            email: req.body.email,
            password: hash,
          }
          // Add the user to the DB
          db.UserData.create(userObj)
            .catch(err => res.json({errors: [{message: 'Error adding to DB'}], user: userObj, details: err}))
            .then(newUser => res.json({status: 'success', user: newUser}));      
          })
    })
})
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