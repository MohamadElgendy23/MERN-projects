import "./navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, removeCookies] = useCookies(["accessToken"]);
  return (
    <ul className="navbarList">
      <li>
        <Link to="/"> Home</Link>
      </li>
      <li>
        <Link to="/create-recipe/"> Create Recipe</Link>
      </li>
      <li>
        <Link to="/saved-recipes/"> Saved Recipes</Link>
      </li>
      <li>
        <Link to="/register/"> Register</Link>
      </li>
      <li>
        {cookies.accessToken ? (
          <Link to="/register" onClick={handleUserRemove}>
            {" "}
            Logout
          </Link>
        ) : (
          <Link to="/login/"> Login</Link>
        )}
      </li>
    </ul>
  );

  function handleUserRemove() {
    removeCookies("accessToken");
    window.localStorage.removeItem("userId");
  }
}