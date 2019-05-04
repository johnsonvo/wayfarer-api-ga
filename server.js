const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Controllers
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const citiesCtrl = require('./controllers/citiesCtrl');

// --------------------- MIDDLEWARE ------------------ //
// CORS - Cross Origin Resource Sharing
// Express CORS Middleware
// npm i cors
const corsOptions = {
  origin: ['http://localhost:3000', 'https://wayfare-front-345.herokuapp.com'],
  // methods: ['GET', 'PUT', 'POST', 'DELETE'],
  // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
// Enable CORS "Pre-Flight" for all routes
app.options('*', cors())

// Express Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret dev key for express sessions',
  resave: false,
  saveUninitialized: false,
}));

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// --------------------- ROUTES ---------------------- //
// GET Root Route
app.get('/', (req, res) => {
  res.send('<h1>API Ready</h1>');
});

// ------------------- API ROUTES -------------------- //
// GET, POST, and PUT User routes
app.use('/api/v1/users', usersCtrl);

// GET, POST, PUT, and DELETE Posts routes
app.use('/api/v1/posts', postsCtrl);

// GET Cities routes
app.use('/api/v1/cities', citiesCtrl);

// ------------------ START SERVER ------------------- //
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));