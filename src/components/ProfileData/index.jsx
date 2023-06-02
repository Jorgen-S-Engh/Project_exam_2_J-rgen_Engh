// getProfileData.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  profileRequest,
  profileSuccess,
  profileFailure,
} from "../../features/profile/profileSlice";

/**
 * useProfileData is a custom React Hook that fetches and provides the user's profile data.
 *
 * It manages the local state of the profile data, initiates a request to the server, and
 * dispatches relevant actions to the Redux store to update the global state depending on
 * the response from the server.
 *
 * The server request uses the logged-in user's name and access token saved in localStorage.
 * The access token is sent in the request header for authorization.
 *
 * The returned data from the API includes both bookings and venues related to the user's profile.
 * If an error occurs during the request, it dispatches a failure action to the Redux store
 * and sets the local state of profileData to an empty object.
 *
 * @function
 * @returns {Object} profileData - The profile data of the current user. Returns an empty
 * object if the data could not be fetched.
 *
 * @example
 * const profileData = useProfileData();
 */

function useProfileData() {
  const [profileData, setProfileData] = useState({});
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(profileRequest());
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_bookings=true&_venues=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const json = await response.json();
        dispatch(profileSuccess(json));
        setProfileData(json);
      } catch (e) {
        dispatch(profileFailure(e.message));
        //Settes til empty object i tillfelle feil
        setProfileData({});
      }
    }

    fetchData();
  }, [dispatch]);

  return profileData;
}

export default useProfileData;
