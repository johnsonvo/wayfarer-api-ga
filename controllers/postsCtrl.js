const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// API Url
const POSTS_URL = '/api/v1/posts';

// ------------ Routes ----------- //
// GET '/'
// // Get all posts, return as json

// POST '/'
// // Create a new post. Return the new post as a json

// GET '/:id'
// // Search user db for post by _id

// PUT '/:id'
// // Edit an existing post by _id
// // Is the request session token from the post creator user?

// DELETE '/:id'
// // Delete a post by _id
// // Is the request session token from the post creator user?

// GET '/user'
// // res.json({error: pass a username})

// GET '/user/:username'
// // Return all posts created by that user

// GET '/city'
// // res.json({error: pass a city})

// GET '/city/:cityURL
// // Return all posts created for that city

module.exports = router;