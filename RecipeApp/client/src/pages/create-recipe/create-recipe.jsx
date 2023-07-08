import "./create-recipe.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import NavBar from "../../components/navbar/navbar";

const baseURL = "http://localhost:4000/recipes/";

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [cookies] = useCookies(["accessToken"]);

  const navigate = useNavigate();

  return (
    <div className="createRecipePageContainer">
      <NavBar></NavBar>
      <h2>Create Recipe</h2>
      <div className="createFormContainer">
        <br />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleRecipeChange}
        ></input>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => {
          return (
            <input
              name="ingredients"
              key={index}
              type="text"
              value={ingredient}
              onChange={(event) => handleIngredientsChange(event, index)}
            ></input>
          );
        })}
        <button onClick={addIngredient}>Add Ingredient</button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleRecipeChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleRecipeChange}
        ></input>
        <label htmlFor="cookingTime">Cooking Time (Minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleRecipeChange}
        ></input>
        <button onClick={handleCreateRecipe}>Create Recipe</button>
        <h2>{successMessage || ""}</h2>
      </div>
    </div>
  );

  function handleRecipeChange(event) {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }

  function handleIngredientsChange(event, index) {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  }

  function addIngredient() {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  async function handleCreateRecipe() {
    try {
      await axios.post(
        baseURL,
        {
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
          cookingTime: recipe.cookingTime,
        },
        {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
      setSuccessMessage("Recipe created successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error.message);
    }
  }
}
