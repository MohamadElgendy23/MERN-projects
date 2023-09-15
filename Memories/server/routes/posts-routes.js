import express from "express";

const router = express.Router();

import { getPosts } from "../controllers/posts-controllers.js";

// route for getting posts
router.get("/", getPosts);

export default router;
