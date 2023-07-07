import "./home.css";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NavBar from "../../components/navbar/navbar";
import axios from "axios";

const baseURLGet = "http://localhost:4000/recipes/";
const baseURLPut = "http://localhost:4000/recipes/";
const baseURLIds = `http://localhost:4000/recipes/savedRecipes/ids/${localStorage.getItem(
  "userId"
)}`;

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
    <div className="homePageContainer">
      <NavBar></NavBar>
      <h1>Welcome to Recipes App!</h1>
      <h2>{recipes.length ? "Recipes" : "No Recipes To Display"}</h2>
      <div className="recipesContainer">
        {recipes.map((recipe) => {
          return (
            <div className="singleRecipeContainer" key={recipe._id}>
              <br />
              <div className="saveAndDeleteContainer">
                <button
                  onClick={(event) => saveRecipe(event, recipe._id)}
                  disabled={savedRecipes.includes(recipe._id)}
                >
                  {savedRecipes.includes(recipe._id)
                    ? "Recipe Saved"
                    : "Save Recipe"}
                </button>
                <button onClick={() => deleteRecipe(recipe._id)}>
                  Delete Recipe
                </button>
              </div>
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

  async function deleteRecipe(recipeId) {
    const baseURLDelete = `http://localhost:4000/recipes/delete/${recipeId.toString()}`;
    try {
      const deleteRecipeRes = await axios.delete(baseURLDelete, {
        headers: {
          authorization: `Bearer ${cookies.accessToken}`,
        },
      });
      setRecipes(deleteRecipeRes.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function saveRecipe(event, recipeId) {
    try {
      await axios.put(
        baseURLPut,
        {
          recipeId,
          userId: localStorage.getItem("userId"),
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
