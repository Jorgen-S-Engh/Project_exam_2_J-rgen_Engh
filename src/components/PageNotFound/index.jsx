import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./PageNotFound.module.scss";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page_not_found}>
      <h1>Page not found</h1>
      <button className={styles.to_home} onClick={() => navigate("/")}>Return to home</button>
    </div>
  )
}

export default PageNotFound