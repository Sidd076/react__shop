import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import './Signup.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("https://6417e3dd8e0487d453e68158.mockapi.io/sid/siddhant");

      let success = false;
      let isEmailValid = false;

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].email === email) {
          isEmailValid = true;

          if (bcrypt.compareSync(password, response.data[i].password)) {
            success = true;
            break;
          } else {
            alert("Invalid Password");
            break;
          }
        }
      }

      if (isEmailValid && success) {
        alert("Login successful");
        navigate("/home");
      } else if (isEmailValid && !success) {
        alert("Invalid Password");
      } else {
        alert("Invalid User");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleInputChange} />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;