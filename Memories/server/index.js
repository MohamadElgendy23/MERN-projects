import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postsRoutes from "./routes/posts-routes.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(express.json());

app.use("/posts", postsRoutes);

const DB_URL =
  "mongodb+srv://mohamadelgendy13:Solomon_23@cluster0.ylak97q.mongodb.net/";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("strictQuery", false);
