import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/register/" element={<Register></Register>}></Route>
          <Route path="/login/" element={<Login></Login>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
