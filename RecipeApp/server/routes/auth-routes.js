require("dotenv").config({
  path: "/Users/mohamadelgendy/Desktop/MERN projects/RecipeApp/server/jwt-secret/.env",
});

const express = require("express");
const authRoutes = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/users-models");

//gets user that sent jwt token in header by authorization
authRoutes.get("/", authorizeUser, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//authorize user based on token passed in to request header (Bearer token)
function authorizeUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, verifiedUser) => {
      if (err) {
        return res.status(403).json({ errorMessage: err.message });
      }
      req.user = verifiedUser;
      next();
    }
  );
}
module.exports = authRoutes;
