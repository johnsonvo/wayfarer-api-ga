




// Middleware =================================== //

// CORS
// npm i cors
const corsOptions = {
  origin: ['http://localhost', 'https://movie-client-50.herokuapp.com'], // replace second one with our react heroku
          credentials: true, // This allows the session cookie to be sent back and forth
          optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));