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
    <div className="authPageContainer">
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
        <button onClick={() => navigate("/login/")}>Login</button>
        <h2>{successMessage || "Register user with above fields"}</h2>
      </div>
    </div>
  );

  function handleUserRegistration() {
    try {
      axios
        .post(baseURL, {
          username: username,
          password: password,
        })
        .then(() => {
          setSuccessMessage("User registered successfully!");
        });
    } catch (error) {
      console.log(error.message);
    }
  }
}
