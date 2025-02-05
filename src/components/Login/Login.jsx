import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "../Login/Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((data) => ({ ...data, [name]: value }));
  };
  localStorage.clear();
  const { login } = useContext(StoreContext);

  return (
    <>
     <div className="input-container-center">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>{" "}
        </div>
        <div className="login-popup-inputs">
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={loginData.email}
            placeholder="Your email"
          />

          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={loginData.password}
            placeholder="Password"
          />
          <button type="button" onClick={() => login(loginData)}>
            Login
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
