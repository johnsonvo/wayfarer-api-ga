const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Database
const db = require('../models');

// API Url
const USERS_URL = '/api/v1/users';

const genericError = 'Something went wrong. Please try again';

// ------------ Routes ----------- //
// GET '/'
// // Don't return all users
// // res.json({error: permission denied})
// // but for testing.... Todo: swap out with denied response
router.get('/', (req, res) => {
  db.UserData.find({})
    .catch(err => console.log(err))
    .then(allUsers => res.json({data: allUsers}));
});

// POST '/login'
router.post('/login', (req, res) => {
  const errors = []; // grab all the errors for res
  if (!req.body.username) { // No username
    errors.push({message: 'Please enter your username'});
  }
  if (!req.body.password) { // No password
    errors.push({message: 'Please enter your password'});
  }
  if (errors.length) { // If any validation failed, respond with error array
    return res.json({user: req.body, errors}); // 'errors' short for 'errors: errors'
  }
  // Lookup the user in the db
  db.UserData.findOne({username: req.body.username})
    .catch(err => res.json({user: req.body, errors: [{message: genericError}]}))
    .then(foundUser => {
      // If no user found...
      if (!foundUser) return res.json({user: req.body, errors: [{message: 'Username or password is incorrect'}]});
      // Otherwise, compare salted and hashed passwords
      bcrypt.compare(req.body.password, foundUser.password)
        .catch(err => res.json({user: req.body, errors: [{message: genericError}]}))
        .then(isMatch => {
          if (isMatch) {
            req.session.loggedIn = true;
            req.session.currentUser = {
              username: foundUser.username,
            };
            // Respond login true, with no errors
            return res.json({login: true});
          } else {
            // Password is not a match
            return res.json({user: req.body, errors: [{message: 'Username or password is incorrect'}]});
          }
        });
    });
});

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
  if (!req.body.username) {
    errors.push({message: 'Please enter your username'});
  }
  if (!req.body.name) {
    errors.push({message: 'Please enter your full name'});
  }
  if (!req.body.password) {
    errors.push({message: 'Please enter your password'});
  }
  if (req.body.password !== req.body.password2) {
    errors.push({message: 'Your passwords do not match'});
  }
  if (req.body.currentCity !== req.body.currentCity) {
    errors.push({message: 'Please enter a current city'});
  }
  if (errors.length) { // If any validation failed, respond with error array
    return res.json({user: req.body, errors}); // 'errors' short for 'errors: errors'
  }
  // All previous validation passed, so creating user...
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
            username: req.body.username,
            name: req.body.name,
            currentCity: req.body.currentCity,
          }
          // Add the user to the DB
          db.UserData.create(userObj)
            .catch(err => res.json({errors: [{message: 'Error adding to DB'}], user: userObj, details: err}))
            .then(newUser => {
              // Automatically log user in
              req.session.loggedIn = true;
              req.session.currentUser = {
                username: newUser.username,
              };
              return res.json({success: true})
            });
          })
    })
})

// POST '/logout'
router.post('/logout', (req, res) => {
  // Delete the user's session
  req.session.destroy(err => {
    if (err) return res.json({error: err, message: genericError});
  });
  res.status(200).clearCookie('connect.sid', {
    path: '/',
  }).json({loggedOut: true});
});

// GET '/profile'
router.get('/profile', (req, res) => {
  // Check if user is logged in
  if (!req.session.loggedIn) {
    return res.json({loggedIn: false})
  }
  // Get the username
  const { username } = req.session.currentUser;
  // Look up their profile
  db.UserData.findOne({username})
    .catch(err => res.json({username, errors: [{message: genericError}]}))
    .then(foundUser => {
      // If no user found...
      if (!foundUser) return res.json({username, errors: [{message: 'Unknown username'}]});
      // otherwise return the user info, minus the password hash
      foundUser.password = '';
      return res.json({foundUser});
    });
});
// // Todo React frontend will open login modal if it gets loggedIn === false response

// PUT '/profile'
// // For updating the profile
// // Checks session token to get the username
// // The username in the session token also acts as validation they are allowed to edit

router.put('/profile', (req, res) => {
  const genericError = 'Please try again. Error updating profile';
  if (!req.session.loggedIn) {
    return res.json({loggedIn: false})
  }
  const { username } = req.session.currentUser;
  // const updateUser = {
  //   email: req.body.email,
  //   username: req.body.username,
  //   name: req.body.name,
  //   currentCity: req.body.currentCity,
  // }

  db.UserData.findOneAndUpdate({username}, req.body, {new: true} )
    .catch(err => res.json({username, errors: [{message: genericError}]}))
    .then(updatedUser => {
      // If no user found...
      if (!updatedUser) return res.json({username, errors: [{message: 'Unknown username'}]});

      // If username changed then change username in their session token
      if (updatedUser.username !== username){
        req.session.currentUser = {
          username: updatedUser.username,
        };
      }
      // otherwise return success
      return res.json({success: true});
    });
});
module.exports = router;