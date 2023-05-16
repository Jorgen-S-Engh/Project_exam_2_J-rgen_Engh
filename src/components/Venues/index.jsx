import React, { useState, useEffect } from 'react';
import styles from "./Venues.module.scss";
import homeImg from "../../assets/home.png"
import breakfast from "../../assets/breakfast.png"
import pets from "../../assets/pawprint.png"
import wifi from "../../assets/wifi.png"
import parking from "../../assets/parked-car.png"
import guests from "../../assets/group.png"
import { Link } from 'react-router-dom';

function Venues() {
    const [venues, setVenues] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues');
                const data = await response.json();
                setVenues(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        };
        fetchVenues();
    }, []);

    useEffect(() => {
        if (searchWord === '') {
            setFilteredVenues(venues);
        } else {
            setFilteredVenues(venues.filter(venue => venue.name.toLowerCase().includes(searchWord.toLowerCase())));
        }
    }, [searchWord, venues]);

    return (
        <div>
          <div className={styles.search_container}>
          <input
                className={styles.search_field}
                type='text'
                placeholder='Search'
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>

          {filteredVenues.map(venue => (
            <Link to={`venue/${venue.id}`} key={venue.id}>
                <div className={styles.venue_card}>
                  <div className={styles.venue_media_container}>
                      <img src={venue.media[0] ? venue.media : homeImg} alt={venue.name ? venue.name : "Placeholder image of a house"} />
                  </div>
                  <div className={styles.headline_container}>
                      <h2>{venue.name} - {!venue.location.city || venue.location.city === "Unknown" ? "Unknown" : venue.location.city}, {venue.location.country && venue.location.country}</h2>
                      <div className={styles.guests_container}>
                          <div className={styles.guests_circle}>{venue.maxGuests}</div>
                          <img className={styles.guests_icon} src={guests} alt="Number of max guests" />
                      </div>
                  </div>
                  {/* <p>Address: {venue.location.address}, {venue.location.city}, {venue.location.zip}, {venue.location.country}</p> */}
                  <div className={styles.meta_container}>
                      {venue.meta.wifi && <img src={wifi} alt="wifi icon"/>}
                      {venue.meta.pets && <img src={pets} alt="pets icon"/>}
                      {venue.meta.breakfast && <img src={breakfast} alt="breakfast icon"/>}
                      {venue.meta.parking && <img src={parking} alt="parking icon"/>}
                  </div>
                  <div className={styles.info_container}>
                      <p>Price: {venue.price}</p>
                      <p>Rating: {venue.rating}</p>
                  </div>
              </div>
            </Link>    

))}
        </div>
    );
}

export default Venues;
