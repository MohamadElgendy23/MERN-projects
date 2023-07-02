require("dotenv").config({
  path: "/Users/mohamadelgendy/Desktop/MERN projects/RecipeApp/server/jwt-secret/.env",
});

const express = require("express");
const usersRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users-models");

//create a new user given username and password
usersRoutes.post("/register/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await Users.findOne({ username });
    if (userExists) {
      return res.status(409).json({ errorMessage: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({ username, hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

usersRoutes.post("/login/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await Users.findOne({ username });
    if (!userExists) {
      return res.status(401).json({ errorMessage: "User not found!" });
    }
    const user = userExists;
    bcrypt.compare(password, user.password, (err, verifiedUser) => {
      if (err) {
        return res.status(403).json({ errorMessage: err });
      }
      const accessToken = jwt.sign(
        { username: verifiedUser.username, password: verifiedUser.password },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(201).json({ accessToken: accessToken });
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

usersRoutes.post("/logout/", async (req, res) => {
  res.status(204).json({ msg: "Successfully logged out!" });
});

module.exports = usersRoutes;
