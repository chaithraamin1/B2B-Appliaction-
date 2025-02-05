import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserProfilePopup from "./components/UserProfile/UserProfilePopup";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import Login from "./components/Login/Login";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {/* {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} */}

      {showUserProfile && (
        <UserProfilePopup setShowUserProfile={setShowUserProfile} />
      )}
      <div className="app">
        <ToastContainer />
        {authenticated && <Navbar setShowUserProfile={setShowUserProfile} />}
        <Routes>
          <Route path="/"  element={<Login />}  />

          <Route
            path="/home"
            element={<Home />}
            setAuthenticated={setAuthenticated}
          />
          <Route path="/company-details" element={<CompanyDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorder" element={<MyOrders />} />
          {/* <Route path="/company-details" element={<CompanyDetails />} /> */}
        </Routes>
      </div>
      {authenticated && <Footer />}
    </>
  );
};

export default App;
