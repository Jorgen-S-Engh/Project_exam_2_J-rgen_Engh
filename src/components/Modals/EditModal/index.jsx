import React, { useEffect, useState } from "react";
import styles from "../Modal.module.scss";
import ModalForm from "../ModalForm";

const EditModal = ({ show, onClose, venueId }) => {
  const [venueData, setVenueData] = useState(null);
  
  useEffect(() => {
    if (venueId) {
      const fetchVenueData = async () => {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`);
        const data = await response.json();
        setVenueData(data);
        console.log(venueData)
      };
      fetchVenueData();
    }
  }, [venueId]);

  if (!show) {
    return null;
  }

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData))
  
      if (!response.ok) {
        throw new Error(`Error updating venue: ${response.statusText}`);
      }
  
      const json = await response.json();
      console.log("Updated venue data:", json);
  
      onClose();
    } catch (error) {
      console.error("Error updating venue:", error);
      
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <div className={styles.scrollable_content}>
          {venueData ? (
            <>
            <div className={styles.headline_container}>
              <h1 className={styles.h1}>Edit Venue</h1>
              <h2 className={styles.h2}>{venueData.name}</h2>
            </div>
  
            <ModalForm onSubmit={handleSubmit} venueData={venueData} onDeleteVenue={true} venueId={venueId} rating={true}/>

            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
