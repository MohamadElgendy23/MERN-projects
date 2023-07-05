import "./home.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NavBar from "../../components/navbar/navbar";
import axios from "axios";

const baseURL = "http://localhost:4000/recipes/";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    async function getUserRecipes() {
      try {
        const userRecipesRes = await axios.get(baseURL, {
          headers: { authorization: `Bearer ${cookies.accessToken}` },
        });
        setRecipes(userRecipesRes.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserRecipes();
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
                  <button onClick={(event) => saveRecipe(event, recipe._id)}>
                    Save Recipe
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

  async function saveRecipe(event, recipeId) {
    try {
      await axios.put(
        baseURL,
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
      event.target.disabled = true;
    } catch (error) {
      console.log(error.message);
    }
  }
}
