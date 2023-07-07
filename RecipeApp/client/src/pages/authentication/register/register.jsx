import "./register.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:4000/users/register/";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="registerPageContainer">
      <h1>User Registration</h1>
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
        <button onClick={handleUserRegistration}>Register</button>
        <label htmlFor="loginButton">Already have an account?</label>
        <button id="loginButton" onClick={() => navigate("/login/")}>
          Login
        </button>
        <h2>{successMessage || "Register user with above fields"}</h2>
        <img src="https://quicklaunch.io/wp-content/uploads/2019/10/user-registration.png"></img>
      </div>
    </div>
  );

  async function handleUserRegistration() {
    try {
      await axios.post(baseURL, {
        username,
        password,
      });
      setSuccessMessage(`User ${username} registered successfully`);
      setTimeout(() => navigate("/login/", 1000));
    } catch (error) {
      console.log(error.message);
    }
  }
}
