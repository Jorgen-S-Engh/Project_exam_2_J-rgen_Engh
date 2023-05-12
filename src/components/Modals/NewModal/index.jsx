import React from "react";
import styles from "../Modal.module.scss";
import ModalForm from "../ModalForm";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";
import { useState } from "react";

const NewModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const [customError, setCustomError] = useState("");
  const [apiError, setApiError] =useState(false)
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
        
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      console.log(formData)
  
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
      console.error("Error creating venue:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <div className={styles.scrollable_content}>
          <div className={styles.headline_container}>
            <h1 className={styles.h1}>New Venue</h1>
          </div>
          <ModalForm onSubmit={handleSubmit} location={true} />
        </div>
        <div className={styles.message_container}>
            {apiError && <ErrorMessage message={customError}/>}
            {success && <SuccessMessage message={"Venue Successfully Created!"}/>}
        </div>
      </div>
    </div>

  );
};

export default NewModal;
