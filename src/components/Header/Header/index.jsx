// Header.js
import React from "react";
import styles from "../Header.module.scss";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/test_profile.jpg";
import { useNavigate } from "react-router-dom";
import Search from "../Search";

function Header() {
  const navigate = useNavigate();

  const avatar = localStorage.getItem("avatar");

  return (
    <div className={styles.header}>
      <div className={styles.logo_container}>
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />
      </div>
      {/* <Search /> */}
      <div className={styles.profile}>
        <img
          className={styles.profile_img}
          src={avatar === "" ? profile : avatar}
          alt="Profile"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default Header;
