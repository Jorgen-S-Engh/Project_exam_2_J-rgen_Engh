import React, { useEffect, useState } from "react";
import styles from "../Modal.module.scss";

const EditModal = ({ show, onClose, venueId }) => {
  const [venueData, setVenueData] = useState(null);

  useEffect(() => {
    if (venueId) {
      const fetchVenueData = async () => {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`);
        const data = await response.json();
        setVenueData(data);
      };

      fetchVenueData();
    }
  }, [venueId]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        {venueData ? (
          <>
            <h1>{venueData.name}</h1>
            <p>{venueData.description}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button className={styles.close_button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
