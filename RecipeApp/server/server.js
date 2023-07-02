const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const usersRoutes = require("./routes/users-routes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

require("dotenv").config({
  path: "./mongoosedb/.env",
});

mongoose.connect(process.env.MONGODB_CONN_STRING).then(() => {
  console.log("DATABASE IS UP AND RUNNING!");
});

app.use("/users", usersRoutes);

app.listen(4000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
