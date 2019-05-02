const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// Controllers
const signupCtrl = require('./controllers/signupCtrl');

// ++++++ MIDDLEWARE ++++++ //

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

// ++++++ HTML ROUTES ++++++ //
// GET Root Route
app.get('/', (req, res) => {
  res.send('<h1>Landing Page</h1>');
});



// ++++++ START SERVER ++++++ //

// Start Server on Port 4000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
