require("dotenv").config();

const express = require("express");
const recipesRoutes = express.Router();
const jwt = require("jsonwebtoken");
const Recipes = require("../models/recipes-models");
const Users = require("../models/users-models");

//get all recipes
recipesRoutes.get("/", authorizeUser, async (req, res) => {
  try {
    const currentRecipes = await Recipes.find({});
    res.status(200).json(currentRecipes);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//create new recipe
recipesRoutes.post("/", authorizeUser, async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//delete a recipe
recipesRoutes.delete("/delete/:recipeId", authorizeUser, async (req, res) => {
  try {
    const recipeId = req.body.params;
    const deletedRecipe = await Recipes.findOneAndDelete({ recipeId });
    if (!deletedRecipe) {
      return res.status(404).json({
        errorMessage: `Recipe with id ${recipeId} doesn't exist. Cannot delete`,
      });
    }
    const newRecipes = await Recipes.find({});
    res.status(200).json(newRecipes);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//save a recipe
recipesRoutes.put("/", authorizeUser, async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    const requestingUser = await Users.findById(userId);
    const recipe = await Recipes.findById(recipeId);
    requestingUser?.savedRecipes.push(recipe);
    await requestingUser?.save();
    res.status(200).json({ savedRecipes: requestingUser?.savedRecipes });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//gets the array of saved recipes objects
recipesRoutes.get("/savedRecipes/:userId/", authorizeUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const requestingUser = await Users.findById(userId);
    const savedRecipes = await Recipes.find({
      _id: { $in: requestingUser?.savedRecipes },
    });
    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//gets the actual saved recipes array (saved recipe ids)
recipesRoutes.get(
  "/savedRecipes/ids/:userId/",
  authorizeUser,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const requestingUser = await Users.findById(userId);
      res.status(200).json({ savedRecipes: requestingUser?.savedRecipes });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
);

//middleware; authorize user each request based on token passed in to request header (Bearer token)
function authorizeUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ errorMessage: err.message });
      }
      next();
    });
  } else {
    res.status(401).json({ errorMessage: "No access token" });
  }
}

module.exports = recipesRoutes;
