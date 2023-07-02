const express = require("express");
const cors = require("cors");
const app = express();
const usersRoutes = require("./routes/users-routes");

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);

app.listen(4000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
