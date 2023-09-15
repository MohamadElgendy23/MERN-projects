import Post from "../models/post-model.js";

// function controller for getting posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // array of all posts
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};

// function controller for creating a post
const createPost = async (req, res) => {
  const postBody = req.body;
  const createdPost = new Post(postBody);
  try {
    await createdPost.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(409).json({ errorMessage: error.message });
  }
};

export { getPosts, createPost };
