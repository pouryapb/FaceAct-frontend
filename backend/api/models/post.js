const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  media: { type: String, required: true },
  mediatype: { type: String, required: true },
  date: { type: Date, default: new Date() },
  likes: [],
});

module.exports = mongoose.model("Post", postSchema);
