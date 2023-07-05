import "./navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  return (
    <div className="navbarComponentContainer">
      <ul className="navbarList">
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          {cookies.accessToken ? (
            <Link to="/create-recipe/"> Create Recipe</Link>
          ) : (
            <Link to="/"> Create Recipe</Link>
          )}
        </li>
        <li>
          {cookies.accessToken ? (
            <Link to="/saved-recipes/"> Saved Recipes</Link>
          ) : (
            <Link to="/"> Saved Recipes</Link>
          )}
        </li>
        <li>
          <Link to="/register/"> Register</Link>
        </li>
        <li>
          {cookies.accessToken ? (
            <Link to="/register" onClick={handleUserRemove}>
              Logout
            </Link>
          ) : (
            <Link to="/login/"> Login</Link>
          )}
        </li>
      </ul>
    </div>
  );

  function handleUserRemove() {
    setCookies("accessToken", "");
    window.localStorage.removeItem("userId");
  }
}
