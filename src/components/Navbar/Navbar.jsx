import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import $ from "jquery";

const Navbar = ({ setShowUserProfile }) => {
  const menus = localStorage.getItem("menus");
  const menuList = JSON.parse(menus);
  console.log("menuList", menuList);

  const { getTotalCartAmount, setSearchQuery, filterProductByMenu,quantity,cartItems} =
    useContext(StoreContext);

  // $('#selectpicker').on('change', function() {
  //   debugger
  //   var selectedValues = $(this).val(); // Get selected values
  //   console.log(selectedValues); // Output selected values
  // });

  return (
    <div className="navbar">
      <Link to="/home">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      {/* <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}>contact us</a>  
      </ul> */}

      <div className="navbar-middle">
        <select
          class="selectpicker"
          id="selectpicker"
          // multiple="multiple"
          aria-label="Default select example"
          onChange={(e) => filterProductByMenu(e.target.value)}
        >
          {menuList?.map((menu, index) => (
            <option value={menu.product_category_name} key={index}>
              {menu.product_category_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onKeyUp={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          {/* <div className={getTotalCartAmount() > 0 ? "7" : ""}></div> */}
          <span class="badge badge-danger">{cartItems[1]}</span>
        </Link>

        <img
          src={assets.profile_image}
          className="profile"
          onClick={() => setShowUserProfile(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
