import NavBar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

export default function NavBarLayout() {
  return (
    <div className="navbarLayoutContainer">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
}
