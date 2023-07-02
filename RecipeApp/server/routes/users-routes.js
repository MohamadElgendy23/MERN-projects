const express = require("express");
const usersRoutes = express.Router();
const Users = require("../models/users-models");

usersRoutes.get("/register/", (req, res) => {
  const { username, password } = req.body;
  const userExists = Users.find({ username });
  if (userExists) con;
});

module.exports = usersRoutes;
