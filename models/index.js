const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/wayfarer';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})
  .then(() => console.log('... MongoDB connected'))
  .catch((err) => console.log(err))


module.exports = {
  UserData: require('./userData'),
  UserPost: require('./userPost'),
  City: require('./city'),
};