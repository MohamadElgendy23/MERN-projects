const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routes/users-routes");
const recipesRoutes = require("./routes/recipes-routes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONN_STRING).then(() => {
  console.log("DATABASE IS UP AND RUNNING!");
});

app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);

app.listen(4000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
