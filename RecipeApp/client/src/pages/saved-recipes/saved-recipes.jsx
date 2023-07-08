import "./saved-recipes.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NavBar from "../../components/navbar/navbar";
import axios from "axios";

const baseURLGet = `http://localhost:4000/recipes/savedRecipes/${localStorage.getItem(
  "userId"
)}`;

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    async function getUserSavedRecipes() {
      try {
        const userSavedRecipesRes = await axios.get(baseURLGet, {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        setSavedRecipes(userSavedRecipesRes.data.savedRecipes);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserSavedRecipes();
  }, []);
  return (
    <div className="savedRecipesPageContainer">
      <NavBar></NavBar>
      <h1>Saved Recipes</h1>
      <h2>{!savedRecipes.length && "No Saved Recipes To Display"}</h2>
      <div className="savedRecipesContainer">
        {savedRecipes.map((recipe) => {
          return (
            <div className="singleRecipeContainer" key={recipe._id}>
              <br />
              <h2>Name: {recipe.name}</h2>
              <div className="ingredientsContainer">
                {recipe.ingredients.map((ingredient, index) => {
                  return (
                    <div key={index}>
                      <p>
                        Ingredient {index + 1}: {ingredient}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p>Instructions: {recipe.instructions}</p>
              <img src={recipe.imageUrl} alt={recipe.name}></img>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
