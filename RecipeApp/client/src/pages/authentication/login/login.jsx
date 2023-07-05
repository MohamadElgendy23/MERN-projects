import "./login.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const baseURL = "http://localhost:4000/users/login/";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  return (
    <div className="loginPageContainer">
      <h1>User Login</h1>
      <div className="formContainer">
        <label htmlFor="usernameLabel">Username: </label>
        <input
          id="usernameLabel"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <label htmlFor="passwordLabel">Password: </label>
        <div className="passwordAndResetContainer">
          <input
            id="passwordLabel"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button type="reset" onClick={() => setPassword("")}>
            X
          </button>
        </div>
        <button onClick={handleUserLogin}>Login</button>
        <label htmlFor="registerButton">Don't have an account?</label>
        <button id="registerButton" onClick={() => navigate("/register/")}>
          Register
        </button>
        <h2>{successMessage || "Login user with above fields"}</h2>
      </div>
    </div>
  );

  async function handleUserLogin() {
    try {
      const accessTokenObj = await axios.post(baseURL, {
        username,
        password,
      });
      setCookies("accessToken", accessTokenObj.data.accessToken);
      window.localStorage.setItem("userId", accessTokenObj.data.userId);
      setSuccessMessage(`User ${username} logged in successfully`);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error.message);
    }
  }
}
