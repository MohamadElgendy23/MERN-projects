import express from "express";

const router = express.Router();

import { getPosts, createPost } from "../controllers/posts-controllers.js";

// route for getting posts
router.get("/", getPosts);

// route for creating a post
router.post("/", createPost);

export default router;
