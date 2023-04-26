import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import profile from "../../assets/test_profile.jpg";
import { useNavigate } from "react-router-dom";

function Header() {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (searchWord) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [searchWord]);

  const handleSearch = async () => {
    // Søkelogikk 
    console.log("Search:", searchWord);
  };

  const avatar = localStorage.getItem("avatar");


  return (
    <div className={styles.header}>
      <div className={styles.logo_container}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.search}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="Search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src={avatar === "" ? profile : avatar} alt="Profile" onClick={(()=> navigate("/profile"))} />
      </div>
    </div>
  );
}

export default Header;
