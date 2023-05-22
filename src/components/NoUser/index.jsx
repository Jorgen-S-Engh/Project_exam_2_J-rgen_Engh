import React from 'react'
import styles from "./NoUser.module.scss";
import { useNavigate  } from 'react-router-dom';

function NoUser({message}) {
  const navigate = useNavigate();
  return (
    <div className={styles.no_user_container}>
      <h1>Please log in to {message}</h1>
      <button className={styles.btn_to_login} onClick={(()=> navigate("/login"))}>To login</button>
    </div>
  )
}

export default NoUser