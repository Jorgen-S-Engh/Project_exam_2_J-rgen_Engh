import styles from "./ProfileInfo.module.scss";
import profile from "../../assets/test_profile.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import MyCalendar from "../Calendar";
import useProfileData from "../ProfileData";



function ProfileInfo() {
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.profile);
  const profileData = useProfileData();

  // Destructure the profileData object
  const bookings = profileData ? profileData._count.bookings : null;
  const venues = profileData ? profileData.venues : null;

  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");


  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }


  function logOut(){
    navigate("/login");
    localStorage.clear();
  }

  return (
    <>
      <div className={styles.profile_info}>
        <div className={styles.image_column}>
          <div className={styles.image_container}>
            <img
              className={styles.img}
              src={data.avatar === "" ? profile : data.avatar}
              alt="Profile"
            />
          </div>
          <div className={styles.btn_container}>
            <button className={`${styles.btn} ${styles.btn_change_avatar}`}>
              Change Avatar
            </button>
            <button className={`${styles.btn} ${styles.btn_log_out}`} onClick={() => logOut()}>Log out</button>
          </div>
        </div>
        <div className={styles.info_column}>
          <h1>{name}</h1>
          <h2>{email}</h2>
          <h3>No. Bookings {bookings}</h3>
          {data.venueManager && <h3>Venue Manager</h3>}
        </div>
        {/* <MyCalendar/> */}
        
      </div>
      {/* <VenueManager/> */}
    
    </>

  );
}

export default ProfileInfo;
