import styles from "./ProfileInfo.module.scss";
import profile from "../../assets/test_profile.jpg";
import { useEffect, useState } from "react";

const avatar = localStorage.getItem("avatar");
const name = localStorage.getItem("name");
const email = localStorage.getItem("email")

function ProfileInfo() {
  const accessToken = localStorage.getItem("accessToken");
  
  const [venueManager, setVenueManager] = useState(false);

  async function getData() {
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const json = await response.json();
      json.venueManager && setVenueManager(true)
      console.log(json._count.bookings)

      console.log(json)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.profile_info}>
      <div className={styles.image_column}>
        <div className={styles.image_container}>
          <img className={styles.img} src={avatar === "" ? profile : avatar} alt="Profile" />
        </div>
        <div className={styles.btn_container}>
          <button className={`${styles.btn} ${styles.btn_change_avatar}`}>Change Avatar</button>
          <button className={`${styles.btn} ${styles.btn_log_out}`}>Log out</button>
        </div>
      </div>
      <div className={styles.info_column}>
        <h1>{name}</h1>
        <h2>{email}</h2>
        <h3>Bookings</h3>
        <h3>No. Bookings</h3>
        {venueManager && <h3>Venue Manager</h3>}
      </div>
    </div>
  );
}

export default ProfileInfo;
