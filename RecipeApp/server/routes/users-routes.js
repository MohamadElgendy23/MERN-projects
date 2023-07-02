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
    if (!password.length) {
      return res.status(403).json({ errorMessage: "Password cannot be empty" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ username: username, password: hashedPassword });
    newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//login user then create access token
usersRoutes.post("/login/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await Users.findOne({ username });
    if (!userExists) {
      return res.status(401).json({ errorMessage: "User not found!" });
    }
    bcrypt.compare(password, userExists.password, (err, passwordMatched) => {
      if (err) {
        return res.status(403).json({ errorMessage: err.message });
      }
      if (!passwordMatched) {
        return res.status(400).json({ msg: "Passwords dont match" });
      }
      const accessToken = jwt.sign(
        { userId: userExists._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res
        .status(201)
        .json({ accessToken: accessToken, userID: userExists._id });
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//logout user
usersRoutes.post("/logout/", async (req, res) => {
  res.status(204).json({ msg: "Successfully logged out!" });
});

module.exports = usersRoutes;
