require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const rootRoutes = require("./routes/rootRoutes.js");
const path = require("path");
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.dandrepairshop.com",
      "https://dandrepairshop.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

//tell server where to grab static files (static file = style.css)
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootRoutes);
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views/404.html"));
  } else if (req.accepts("json")) {
    res.json({ errorMessage: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
