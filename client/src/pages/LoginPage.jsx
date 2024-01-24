import React, { useState } from "react";
import "../styles/login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the response status indicates success
      if (response.ok) {
        const loggedIn = await response.json();
  
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData.message);
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };
  

  const handleInputFocus = (name) => {
    setFocusedField(name);
  };

  const handleInputBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={focusedField !== 'email' ? 'Email' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleInputFocus('email')}
            onBlur={handleInputBlur}
            required
          />
          <input
            type="password"
            placeholder={focusedField !== 'password' ? 'Password' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleInputFocus('password')}
            onBlur={handleInputBlur}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
