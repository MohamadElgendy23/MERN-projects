require("dotenv").config({
  path: "/Users/mohamadelgendy/Desktop/MERN projects/RecipeApp/server/jwt-secret/.env",
});

const express = require("express");
const recipesRoutes = express.Router();
const jwt = require("jsonwebtoken");
const Recipes = require("../models/recipes-models");
const Users = require("../models/users-models");

//get all recipes
recipesRoutes.get("/", async (req, res) => {
  try {
    const currentRecipes = await Recipes.find({});
    res.status(200).json(currentRecipes);
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
});

//create new recipe
recipesRoutes.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
});

recipesRoutes.put("/", async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    const requestingUser = await Users.findById(userId);
    const recipe = await Recipes.findById(recipeId);
    requestingUser?.savedRecipes.push(recipe);
    await requestingUser?.save();
    res.status(200).json({ savedRecipes: requestingUser?.savedRecipes });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
});

recipesRoutes.get("/savedRecipes/ids", async (req, res) => {
  try {
    const { userId } = req.body;
    const requestingUser = await Users.findById(userId);
    res.status(200).json({ savedRecipes: requestingUser?.savedRecipes });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
});

recipesRoutes.get("/savedRecipes/", async (req, res) => {
  try {
    const { userId } = req.body;
    const requestingUser = await Users.findById(userId);
    const savedRecipes = await Recipes.find({
      _id: { $in: requestingUser.savedRecipes },
    });
    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ messageError: error.message });
  }
});

//authorize user each request based on token passed in to request header (Bearer token)
function authorizeUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ errorMessage: err.message });
    }
    next();
  });
}

module.exports = recipesRoutes;
