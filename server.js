const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 4000;

// Controllers
const loginCtrl = require('./controllers/loginCtrl');
const signupCtrl = require('./controllers/signupCtrl');
const profileCtrl = require('./controllers/profileCtrl');
const userPostsCtrl = require('./controllers/userPostsCtrl');
const dumpDataCtrl = require('./controllers/dumpDataCtrl');

// --------------------- MIDDLEWARE --------------------- //
// CORS - Cross Origin Resource Sharing
// Express CORS Middleware
// npm i cors
const corsOptions = {
  origin: ['http://localhost', 'https://movie-client-50.herokuapp.com'], // replace second one with our react heroku
          credentials: true, // This allows the session cookie to be sent back and forth
          optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//express sessions middle ware

//route to serve public directory

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// ++++++ HTML ROUTES ++++++ //
// GET Root Route - 
app.get('/', (req, res) => {
  res.send('<h1>Landing Page</h1>');
});

// GET & POST User login route
app.use('/api/login', loginCtrl);

// GET & POST User signup route
app.use('/api/signup', signupCtrl);

// GET & POST User profile route
app.use('/api/profile', profileCtrl);

//GET & POST User posts route
app.use('/api/userPosts', userPostsCtrl);

// Create User
app.use('/api/v1/signup', signupCtrl);

// ++++++ API ROUTES ++++++ //

// Dump all data for testing puposes only
app.use('/api/alldata', dumpDataCtrl);


// ++++++ START SERVER ++++++ //
// Start Server on Port 4000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));