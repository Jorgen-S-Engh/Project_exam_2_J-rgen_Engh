import React, { useState } from "react";
import styles from "../Header.module.scss";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/no_user.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [avatarImg, setAvatarImg] = useState(localStorage.getItem("avatar"));


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
          src={avatarImg ? avatarImg : profile}
          alt="Profile"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default Header;
