import styles from "./ProfileInfo.module.scss";
import profile from "../../assets/test_profile.jpg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileRequest, profileSuccess, profileFailure } from "../../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";
// import MyCalendar from "../Calendar";



function ProfileInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.profile);
  const [bookings, setBookings] = useState();


  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name")

  async function getData() {
    try {
      dispatch(profileRequest());
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();
      dispatch(profileSuccess(json));
      setBookings(json._count.bookings)
      console.log(data)
      
    } catch (e) {
      dispatch(profileFailure(e.message));
    }
  }

  useEffect(() => {
    getData();
  }, [dispatch]);

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
      {/* <MyCalendar/> */}
    </div>
  );
}

export default ProfileInfo;
