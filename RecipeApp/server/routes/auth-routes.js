require("dotenv").config({
  path: "/Users/mohamadelgendy/Desktop/MERN projects/RecipeApp/server/jwt-secret/.env",
});

const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users-models");

//gets user that sent jwt token in header by authorization
authRoutes.get("/user", (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, verifiedUser) => {
        if (err) {
          return res.status(403).json({ errorMessage: err.message });
        }
        res.status(200).json(verifiedUser);
      }
    );
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

authRoutes.post("/", (req, res) => {});

module.exports = authRoutes;
