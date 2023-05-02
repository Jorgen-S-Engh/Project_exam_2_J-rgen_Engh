// getProfileData.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileRequest, profileSuccess, profileFailure } from "../../features/profile/profileSlice";

//useAuth kit

function useProfileData() {
  const [profileData, setProfileData] = useState();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(profileRequest());
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const json = await response.json();
        dispatch(profileSuccess(json));
        setProfileData(json);
      } catch (e) {
        dispatch(profileFailure(e.message));
      }
    }

    fetchData();
  }, [dispatch]);

  return profileData;
}


export default useProfileData;
