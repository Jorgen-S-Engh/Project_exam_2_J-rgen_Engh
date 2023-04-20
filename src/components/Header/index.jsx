import styles from "./Header.module.scss"
import logo from "../../assets/logo.png"
import profile from "../../assets/test_profile.jpg"


function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo_container}>
        <img src={logo}></img>
      </div>
      <div className={styles.profile}>
        <img className={styles.profile_img} src={profile} alt="" />
      </div>
    
    </div>
  )
}

export default Header