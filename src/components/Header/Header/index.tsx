import React, { useState } from "react";
import styles from "../Header.module.scss";
import logo from "../../../assets/logo.png";
import profile from "../../../assets/no_user.png";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
          <AvatarImage
            className="cursor-pointer"
            src={avatarImg ? avatarImg : "https://github.com/shadcn.png"}
            onClick={() => navigate("/profile")}
            alt="profile-img"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
