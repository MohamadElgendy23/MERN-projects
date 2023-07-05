import "./home.css";
import React from "react";
import NavBar from "../../components/navbar/navbar";

const baseURL = "http://localhost:4000/recipes/";

export default function Home() {
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    async function getUserRecipes() {
      await axios;
    }
    getUserRecipes();
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div className="displayRecipesContainer">{}</div>
    </>
  );
}
