import styles from "./ProfileInfo.module.scss";
import profile from "../../assets/test_profile.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useProfileData from "../ProfileData";
// import BookingInfo from "../BookingInfo";


function ProfileInfo() {
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.profile);
  const profileData = useProfileData();

  const bookings = profileData && profileData._count ? profileData._count.bookings : null;
  const venues = profileData && profileData.venues ? profileData.venues : 0;
  const bookingsArray = profileData && profileData.bookings ? profileData.bookings : 0;
  
  console.log(venues)
  if(venues){
    console.log("venues is true")
  }else{
    console.log("venues is false")
  }

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
      <div className={styles.bookings_venues}>
        <h3>Bookings</h3>
        <div className={styles.booking_container}>
          {bookingsArray.length > 0 ? (
            bookingsArray.map((booking) => (
              <div key={booking.id} className={styles.booking_card}>
                <h4>{booking.venue.name}</h4>
                <p>Date From: {booking.dateFrom}</p>
                <p>Date To: {booking.dateTo}</p>
                <p>Guests: {booking.guests}</p>
                <img className={styles.booking_image} src={booking.venue.media} alt={booking.venue.name} />
              </div>
            ))
          ) : (
            <p>No Bookings</p>
          )}
        </div>
        {venues.length > 0 ? <h3>Your Venues</h3> : <h3>You have no venues yet</h3>}
        <div className={styles.venue_container}>
          {data.venueManager && venues ? (
            venues.map((venue) => (
              <div key={venue.id} className={styles.venue_card}>
                <h4>{venue.name}</h4>
                <p>{venue.description}</p>
                <img className={styles.venue_image} src={venue.media} alt={venue.name} />
                <button className={`${styles.btn}`}>View and edit</button>
              </div>
            ))
          ) : (
            <p>No Venues</p>
          )}
        </div>
      </div>


    </>

  );
}

export default ProfileInfo;
