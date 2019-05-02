const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  currentCity: String,
  userPic: String,
  signupDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index(
  { username: 1, email: 1 }, 
  { unique: true },
);

const UserData = mongoose.model('User', UserSchema);

module.exports = UserData;