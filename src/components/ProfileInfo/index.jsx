import styles from "./ProfileInfo.module.scss";
import profile from "../../assets/test_profile.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useProfileData from "../ProfileData";



function ProfileInfo() {
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.profile);
  const profileData = useProfileData();

  const bookings = profileData ? profileData._count.bookings : null;
  const venues = profileData ? profileData.venues : null;
  const bookingsArray = profileData ? profileData.bookings : 0;
  console.log(bookingsArray)
  

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
          <h1>{data.name}</h1>
          <h2>{data.email}</h2>
          <h3>No. Bookings {bookings}</h3>
          {data.venueManager && <h3>Venue Manager</h3>}
        </div>
        
      </div>
      <h3>Bookings</h3>
      {bookingsArray.length > 0 ? (
        bookingsArray.map((booking) =>(
          <div key={booking.id}>
            <p>Date From: {booking.venue.name}</p>
            <p>Date From: {booking.dateFrom}</p>
            <p>Date To: {booking.dateTo}</p>
            <p>Guests: {booking.guests}</p>
            <img src={booking.venue.media} alt="" />
          </div>
        ))
      ): (
        <p>No Bookings</p>
      )}
      {data.venueManager ? (
        venues.map((venues) =>(
          <div key={venues.id}>
            <h4>{venues.name}</h4>
            <p>{venues.description}</p>
            <div className={styles.venue_media}>
              <img className={styles.venue_media__img} src={venues.media}></img>
            </div>

          </div>
        ))
      ): (
        <p>No Bookings</p>
      )}



    
    </>

  );
}

export default ProfileInfo;
