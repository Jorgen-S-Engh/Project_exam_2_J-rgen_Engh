import React, { useState, useEffect } from "react";
import styles from "../Header.module.scss";

function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchWord) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [searchWord]);

  const handleSearch = async () => {
    // Search logic
    console.log("Search:", searchWord);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
    </div>
  );
}

export default Search;