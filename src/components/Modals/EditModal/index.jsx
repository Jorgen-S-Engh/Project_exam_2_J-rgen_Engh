import React, { useEffect, useState } from "react";
import styles from "../Modal.module.scss";
import ModalForm from "../ModalForm";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";


/**
 * EditModal is a React component that presents a modal for editing venue information.
 * 
 * The modal fetches the current venue data from the API when the component mounts,
 * and provides a form for updating the venue's information. The form's submit handler
 * sends a PUT request to the API with the updated data. 
 *
 * The visibility of the modal can be controlled externally through the `show` prop and can be closed
 * by calling the `onClose` function.
 * 
 * If the API request is successful, a success message is displayed and the page is reloaded 
 * after 2.5 seconds. If an error occurs, an error message is displayed.
 *
 * @component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.show - Determines whether the modal is visible or not
 * @param {Function} props.onClose - Function to close the modal
 * @param {string} props.venueId - The ID of the venue to edit
 * 
 * @example
 * return (
 *   <EditModal show={modalVisible} onClose={closeModal} venueId={"1234"} />
 * )
 */

const EditModal = ({ show, onClose, venueId }) => {
  const [venueData, setVenueData] = useState(null);
  const [customError, setCustomError] = useState("");
  const [apiError, setApiError] =useState(false)
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (venueId) {
      const fetchVenueData = async () => {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?_bookings=true`);
        const data = await response.json();
        setVenueData(data);
      };
      fetchVenueData();
    }
  }, [venueId]);

  useEffect(() => {
    console.log(venueData);
  }, [venueData]);

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
      const json = await response.json();

      const handleSuccess = () => {
        setSuccess(true);
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
              <div className={styles.bookings}>
                <h3>Your bookings</h3>
                {venueData.bookings.length > 0 ? (
                  venueData.bookings.map((booking, index) =>(
                    <div key={booking.id} className={styles.booking_card}>
                      <h4>Booking no: {index +1}</h4>
                      <p>From: {new Date (booking.dateFrom).toDateString()}</p>
                      <p>To: {new Date (booking.dateTo).toDateString()}</p>
                      <p>No guests: {booking.guests}</p>
                    </div>
                  ))

                ): <h3>No bookings yet</h3>}
            </div>
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
