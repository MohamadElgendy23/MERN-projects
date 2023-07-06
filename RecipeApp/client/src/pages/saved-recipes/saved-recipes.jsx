import "./saved-recipes.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NavBar from "../../components/navbar/navbar";
import axios from "axios";

const baseURL = `http://localhost:4000/recipes/savedRecipes/${window.localStorage.getItem(
  "userId"
)}`;

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    async function getUserSavedRecipes() {
      try {
        const userSavedRecipesRes = await axios.get(baseURL, {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        setSavedRecipes(userSavedRecipesRes.data.savedRecipes);
        console.log(userSavedRecipesRes.data.savedRecipes);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserSavedRecipes();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div className="displayRecipesContainer">
        <h1>Saved Recipes</h1>
        <ul>
          {savedRecipes.map((recipe) => {
            return (
              <div className="singleRecipeContainer" key={recipe._id}>
                <li>
                  <h2>Name: {recipe.name}</h2>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                      return (
                        <li key={index}>
                          <p>
                            Ingredient {index + 1}: {ingredient}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <p>Instructions: {recipe.instructions}</p>
                  <img src={recipe.imageUrl} alt={recipe.name}></img>
                  <p>Cooking Time: {recipe.cookingTime} minutes</p>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
