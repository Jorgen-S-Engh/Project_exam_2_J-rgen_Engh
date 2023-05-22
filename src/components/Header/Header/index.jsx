// Header.js
import React from "react";
import styles from "../Header.module.scss";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/test_profile.jpg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const avatar = localStorage.getItem("avatar");
  console.log(avatar)
  if(avatar){
    console.log("avatar is true")
  }else{
    console.log("avatar is false")
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo_container}>
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className={styles.profile}>
        
        <img
          className={styles.profile_img}
          src={avatar ==="null" ? profile : avatar}
          alt="Profile"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default Header;
