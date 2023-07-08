require("dotenv").config();

const express = require("express");
const recipesRoutes = express.Router();
const jwt = require("jsonwebtoken");
const Recipes = require("../models/recipes-models");
const Users = require("../models/users-models");

recipesRoutes.use(authorizeUser);

//get all recipes for user
recipesRoutes.get("/", async (req, res) => {
  try {
    const requestingUserId = req.userId;
    const currentRecipes = await Recipes.find({ userId: requestingUserId });
    res.status(200).json(currentRecipes);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//create new recipe
recipesRoutes.post("/", async (req, res) => {
  try {
    const requestingUserId = req.userId;
    const newRecipe = new Recipes({ ...req.body, userId: requestingUserId });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//delete a recipe
recipesRoutes.delete("/delete/:recipeId/", async (req, res) => {
  try {
    const requestingUserId = req.userId;
    const recipeId = req.params.recipeId;
    const deletedRecipe = await Recipes.findOneAndDelete({
      userId: requestingUserId,
      _id: recipeId,
    });
    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//save a recipe
recipesRoutes.put("/saveRecipe/", async (req, res) => {
  try {
    const requestingUserId = req.userId;
    const requestingUser = await Users.findById(requestingUserId);
    const { recipeId } = req.body;
    const recipe = await Recipes.findOne({
      userId: requestingUserId,
      _id: recipeId,
    });
    requestingUser?.savedRecipes.push(recipe);
    await requestingUser?.save();
    res.status(200).json({ savedRecipes: requestingUser?.savedRecipes });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//gets the array of saved recipes objects
recipesRoutes.get("/savedRecipes/", async (req, res) => {
  try {
    const requestingUserId = req.userId;
    const requestingUser = await Users.findById(requestingUserId);
    const savedRecipes = await Recipes.find({
      _id: { $in: requestingUser?.savedRecipes },
    });
    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//gets the actual saved recipes array (saved recipe ids)
recipesRoutes.get("/savedRecipes/ids/", async (req, res) => {
  try {
    const requestingUserId = req.userId;
    const requestingUser = await Users.findById(requestingUserId);
    res.status(200).json({ savedRecipes: requestingUser?.savedRecipes });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//middleware; authorize user each request based on token passed in to request header (Bearer token)
function authorizeUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (accessToken) {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, jwtPayload) => {
        if (err) {
          return res.status(403).json({ errorMessage: err.message });
        }
        req.userId = jwtPayload.userId;
        next();
      }
    );
  } else {
    res.status(401).json({ errorMessage: "No access token" });
  }
}

module.exports = recipesRoutes;
