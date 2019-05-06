const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPostSchema = new Schema({
  username: String,
  cityURL: String,
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  }
})

const UserPost = mongoose.model('UserPost', UserPostSchema);

module.exports = UserPost;