const express = require("express");
const usersRoutes = express();

usersRoutes.get("/register/", (req, res) => {
  res.send("Hello!");
});

module.exports = usersRoutes;
