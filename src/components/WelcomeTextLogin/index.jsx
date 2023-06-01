import React from 'react'
import styles from "./Login.module.scss";
import logo from "../../assets/logo.png"
import LoginForm from '../../components/LoginForm';


/**
 * WelcomeTextLogin is a stateless React Component used for displaying a welcome message on the login page.
 * 
 * The component includes a logo image and a welcome text, structured in a flex container for layout purposes. 
 * 
 * The logo image is imported from the assets folder and rendered using an img tag. The alt text provided for the image 
 * is 'Logo for Holidaze'. The headline and paragraph texts provide information about the Holidaze service.
 * 
 * The component uses SCSS modules for styling, with styles imported from 'Login.module.scss'.
 *
 * @component
 * @example
 * 
 * return (
 *   <WelcomeTextLogin />
 * )
 */

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