const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// --------------------- MIDDLEWARE --------------------- //

// CORS - Cross Origin Resource Sharing
// Express CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// --------------------- HTML ROUTES --------------------- //
// GET Root Route
app.get('/', (req, res) => {
  res.send('<h1>Landing Page</h1>');
});

// --------------------- API ROUTES --------------------- //

// Create User
app.use('/api/v1/signup', signupCtrl);