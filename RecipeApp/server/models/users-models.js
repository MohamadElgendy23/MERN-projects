const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  savedRecipes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "recipes", required: true },
  ],
});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;
