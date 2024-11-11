import React, { useState, useEffect } from "react";
import styles from "./Venues.module.scss";
import breakfast from "../../assets/breakfast.png";
import pets from "../../assets/pawprint.png";
import wifi from "../../assets/wifi.png";
import parking from "../../assets/parked-car.png";
import guests from "../../assets/group.png";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import CatchError from "../../components/CatchError";
import { Input } from "@/components/ui/input";

/**
 * Venues is a React Component that fetches and displays a list of venues.
 *
 * The component retrieves venue data from the API 'https://api.noroff.dev/api/v1/holidaze/venues' and
 * stores the response in the `venues` state. It also provides a search input field to filter the venues.
 *
 * This component handles its own loading state via the `isLoading` state. During the API request, it sets
 * `isLoading` to true and displays a loading spinner. Once the API request completes, it sets `isLoading` to false.
 *
 * This component also handles error states via the `isError` and `customError` states. If the API request fails,
 * it sets `isError` to true and displays an error message through `customError`.
 *
 * The returned JSX renders a search input and a list of venue cards. Each venue card is a Link that redirects to the
 * detailed view of the venue on click.
 *
 * The component uses SCSS modules for styling, with styles imported from 'Venues.module.scss'.
 *
 * @component
 * @example
 * <Venues />
 */
function Venues() {
  const [venues, setVenues] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customError, setCustomError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/venues"
        );
        const data = await response.json();
        setVenues(data);
        if (!Array.isArray(data)) {
          throw new Error("Error loading API");
        }
      } catch (error) {
        setIsError(true);
        setCustomError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenues();
  }, []);

  useEffect(() => {
    if (searchWord === "") {
      setFilteredVenues(venues);
    } else {
      setFilteredVenues(
        venues.filter((venue) =>
          venue.name.toLowerCase().includes(searchWord.toLowerCase())
        )
      );
    }
  }, [searchWord, venues]);

  if (isError) {
    return <CatchError errorMessage={customError} />;
  }

  return (
    <div>
      <div className="my-5 flex justify-center">
        <Input
          className="w-1/2"
          type="text"
          placeholder="Search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <h1 className={styles.headline}>Featured Venues</h1>
      <div className={styles.card_container}>
        {isLoading ? (
          <Spinner />
        ) : (
          filteredVenues.map((venue) => (
            <Link to={`venue/${venue.id}`} key={venue.id}>
              <div className={styles.venue_card}>
                <div className={styles.venue_media_container}>
                  <img src={venue.media[0]}></img>
                </div>
                <div className={styles.headline_container}>
                  <h2>
                    {venue.name} -{" "}
                    {!venue.location.city || venue.location.city === "Unknown"
                      ? "Unknown"
                      : venue.location.city}
                    , {venue.location.country && venue.location.country}
                  </h2>
                  <div className={styles.guests_container}>
                    <div className={styles.guests_circle}>
                      {venue.maxGuests}
                    </div>
                    <img
                      className={styles.guests_icon}
                      src={guests}
                      alt="Number of max guests"
                    />
                  </div>
                </div>
                <div className={styles.meta_container}>
                  {venue.meta.wifi && <img src={wifi} alt="wifi icon" />}
                  {venue.meta.pets && <img src={pets} alt="pets icon" />}
                  {venue.meta.breakfast && (
                    <img src={breakfast} alt="breakfast icon" />
                  )}
                  {venue.meta.parking && (
                    <img src={parking} alt="parking icon" />
                  )}
                </div>
                <div className={styles.info_container}>
                  <p>Price: {venue.price}</p>
                  <p>Rating: {venue.rating}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Venues;
