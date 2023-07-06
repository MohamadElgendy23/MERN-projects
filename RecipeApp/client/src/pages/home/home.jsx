import "./home.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NavBar from "../../components/navbar/navbar";
import axios from "axios";

const baseURLGet = "http://localhost:4000/recipes/";
const baseURLPut = "http://localhost:4000/recipes/";
const baseURLIds = "http://localhost:4000/savedRecipes/ids:userId";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const userRecipesRes = await axios.get(baseURLGet, {
          headers: { authorization: `Bearer ${cookies.accessToken}` },
        });
        setRecipes(userRecipesRes.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getSavedRecipesIds() {
      try {
        const savedRecipesRes = await axios.get(baseURLIds, {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        setSavedRecipes(savedRecipesRes.data.savedRecipes);
      } catch (error) {
        console.log(error.message);
      }
    }

    getUserRecipes();
    getSavedRecipesIds();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="displayRecipesContainer">
        <h1>Recipes</h1>
        <ul>
          {recipes.map((recipe) => {
            return (
              <div className="singleRecipeContainer" key={recipe._id}>
                <li>
                  <button
                    onClick={(event) => saveRecipe(event, recipe._id)}
                    disabled={isSavedRecipe(recipe._id)}
                  >
                    {isSavedRecipe(recipe._id) ? "Saved" : "Save"}
                  </button>
                  <h2>Name: {recipe.name}</h2>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                      return (
                        <li key={index}>
                          <p>
                            Ingredient {index + 1}: {ingredient}{" "}
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

  async function isSavedRecipe(recipeId) {
    return savedRecipes.includes(recipeId);
  }

  async function saveRecipe(event, recipeId) {
    try {
      await axios.put(
        baseURLPut,
        {
          recipeId,
          userId: window.localStorage.getItem("userId"),
        },
        {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
