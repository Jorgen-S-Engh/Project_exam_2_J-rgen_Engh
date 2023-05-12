import React, { useEffect, useState } from "react";
import styles from "../Modal.module.scss";
import ModalForm from "../ModalForm";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";

const EditModal = ({ show, onClose, venueId }) => {
  const [venueData, setVenueData] = useState(null);
  const [customError, setCustomError] = useState("");
  const [apiError, setApiError] =useState(false)
  const [success, setSuccess] = useState(false);
  
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
      const json = await response.json();

      const handleSuccess = () => {
        setSuccess(true);
        console.log("yeeh success")
        setTimeout(() => {
          location.reload();
        }, 2500); 
      };
      
      if(response.ok){
        handleSuccess()
        setSuccess(true);
      }else{
        setCustomError(json.errors[0].message)
        setApiError(true);
        throw new Error(`Error updating venue: ${response.statusText}`);

      }
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
        <div className={styles.message_container}>
            {apiError && <ErrorMessage message={customError}/>}
            {success && <SuccessMessage message={"Venue Edited Successfully"}/>}
        </div>
      </div>
      
    </div>
  );
};

export default EditModal;
