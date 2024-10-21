import React, { useState } from "react";
import styles from "../Header.module.scss";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/no_user.png";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Header component that includes a logo and a profile picture.
 * Clicking on the logo navigates to the home page ("/").
 * Clicking on the profile picture navigates to the profile page ("/profile").
 *
 * @component
 *
 * @returns {JSX.Element} The Header component.
 *
 * @example
 * return (
 *   <Header />
 * )
 */

function Header() {
  const navigate = useNavigate();
  const [avatarImg, setAvatarImg] = useState(localStorage.getItem("avatar"));

  return (
    <div className={styles.header}>
      <div className={styles.logo_container}>
        <img src={logo} alt="Logo" onClick={() => navigate("/")} />
      </div>
      <div className={styles.profile}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
