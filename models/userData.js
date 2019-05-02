const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  favoriteCity: String,
  userPic: String,
  signupDate: {
    type: Date,
    default: Date.now
  }
});

const UserData = mongoose.model('User', UserSchema);

module.exports = UserData;