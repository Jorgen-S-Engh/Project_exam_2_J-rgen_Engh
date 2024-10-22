import { useState, useEffect } from "react";
import { getVenues } from "../api/venues";

const baseUrl = "https://v2.api.noroff.dev/";

export default function VenuesV2() {
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getVenues();
      setVenueData(data);
    }
    fetchData();
  }, []);
  console.log(venueData);

  return (
    <>
      <div>
        {venueData.map((venue) => {
          return <h4 key={venue.id}>{venue.name}</h4>;
        })}
      </div>
    </>
  );
}
