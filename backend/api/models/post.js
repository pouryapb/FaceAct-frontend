import { Schema, model } from "mongoose";

const postSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: { type: String, required: true },
  text: { type: String, required: true },
  media: String,
  mediatype: String,
  date: { type: Date, default: new Date() },
  likes: [],
});

export default model("Post", postSchema);
