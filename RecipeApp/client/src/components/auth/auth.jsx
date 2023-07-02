import "./auth.css";
import axios from "axios";
import React, { useState } from "react";

const baseURL = "http://localhost:4000/users/register/";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="authPageContainer">
      <h1>User Registration</h1>
      <div className="formContainer" onSubmit={handleUserRegistration}>
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
        <button disabled={!username || !password}>Register</button>
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
          console.log("User created successfully");
        });
    } catch (error) {
      console.log(error.message);
    }
  }
}
