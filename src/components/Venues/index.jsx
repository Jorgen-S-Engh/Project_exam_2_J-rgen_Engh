import React, { useState, useEffect } from 'react';
import styles from "./Venues.module.scss";

function Venues() {
    const [venues, setVenues] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);

    // Fetch venues from the API when the component mounts
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues');
                const data = await response.json();
                setVenues(data);
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        };
        fetchVenues();
    }, []);

    // Update the filtered venues when the search word or the venues array changes
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
                <div key={venue.id}>
                    <h2>{venue.name}</h2>
                    {/* Add more venue details here */}
                </div>
            ))}
        </div>
    );
}

export default Venues;
