import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  creator: String,
  tags: [String],
  selectedImageFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
