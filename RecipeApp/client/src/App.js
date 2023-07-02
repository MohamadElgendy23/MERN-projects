import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Auth from "./components/auth/auth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/auth" element={<Auth></Auth>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
