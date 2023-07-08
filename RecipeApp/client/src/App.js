import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/authentication/register/register";
import Login from "./pages/authentication/login/login";
import CreateRecipe from "./pages/create-recipe/create-recipe";
import SavedRecipes from "./pages/saved-recipes/saved-recipes";
import NoPage from "./pages/NoPage(404)/NoPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PageWithNavBar></PageWithNavBar>}>
          <Route index="/" element={<Home></Home>} />
          <Route
            path="create-recipe/"
            element={<CreateRecipe></CreateRecipe>}
          />
          <Route
            path="saved-recipes/"
            element={<SavedRecipes></SavedRecipes>}
          />
          </Route>
          <Route path="register/" element={<Register></Register>} />
          <Route path="login/" element={<Login></Login>} />
          <Route path="*" element={<NoPage></NoPage>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
