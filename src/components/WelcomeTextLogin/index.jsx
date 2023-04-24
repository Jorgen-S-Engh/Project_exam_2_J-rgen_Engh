import React from 'react'
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png"
import LoginForm from '../../components/LoginForm';




function WelcomeTextLogin() {
  return (
    <div className={styles.login_container}>
      <div className={styles.logo_container}>
        <img src={logo} alt="Logo for Holidaze" />
      </div>
      <div className={styles.welcome_text}>
        <h1 className={styles.headline}>Welcome to Holidaze</h1>
        <p> Finding the perfect venue for your next event is just a few clicks away. Holidaze is your one-stop destination for discovering, comparing, and booking unique spaces that cater to all your special occasions.</p>
      </div>
    </div>
  
  )
}

export default WelcomeTextLogin