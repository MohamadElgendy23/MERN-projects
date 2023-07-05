const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipesSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Recipes = mongoose.model("recipes", RecipesSchema);

module.exports = Recipes;
