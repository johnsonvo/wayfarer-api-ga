const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// API Url
const POSTS_URL = '/api/v1/posts';

const genericError = 'Something went wrong. Please try again';
// ------------ Routes ----------- //
// GET '/'
// // Get all posts, return as json
router.get('/', (req, res) => {
  db.UserPost.find({})
  .catch(err => res.json({errors: [{message: genericError, error: err}]}))
    .then(allPosts => res.json({allPosts}));
});

// POST '/'
// // Create a new post. Return the new post as a json
router.post('/', (req, res) => {
  const errors = [];
  // TODO: Add validation for characters.
  let post = (req.body)
  db.UserPost.create(post);
    post.save()
    .then(post => { res.status(200).json({'new post ': post})})
    .catch(err => {res.status(400).send('new post failed')})
});

// GET '/:id'
// // Search post db for post by _id
router.get('/:id', (req, res) => {
  db.UserPost.findById(req.params.id)
    .catch(err => res.json({errors: [{message: genericError, error: err}]}))
    .then(foundPost => res.json({foundPost}));
});

// PUT '/:id'
// // Edit an existing post by _id
// // Is the request session token from the post creator user?

// DELETE '/:id'
// // Delete a post by _id
// // Is the request session token from the post creator user?

// GET '/user/:username'
// // Return all posts created by that user
router.get('/user/:username', (req, res) => {
  db.UserPost.find({username: req.params.username})
    .catch(err => res.json({errors: [{message: genericError, error: err}]}))
    .then(foundPosts => res.json({foundPosts}));
});

module.exports = router;