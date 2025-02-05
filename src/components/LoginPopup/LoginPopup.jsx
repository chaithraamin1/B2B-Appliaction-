import React, { useState, useEffect, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    debugger;
    const name = event.target.name;
    const value = event.target.value;
    setRegisterData((data) => ({ ...data, [name]: value }));
    setLoginData((data) => ({ ...data, [name]: value }))
  };

  const { register,login } = useContext(StoreContext);

  return (
    // <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>{" "}

        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <><input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={registerData.name}
              placeholder="Your name" /><input
                type="number"
                name="mobile"
                onChange={onChangeHandler}
                value={registerData.mobile}
                placeholder="Your mobile number" /></> 
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={registerData.email}
            placeholder="Your email"
          />
         

          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={registerData.password}
            placeholder="Password"
          />
        </div>

        <button
          type="button"
          onClick={() =>
            currState === "Login" ? login(loginData) : register(registerData)
          }
        >
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span  onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </div>
    // </div>
  );
};

export default LoginPopup;
