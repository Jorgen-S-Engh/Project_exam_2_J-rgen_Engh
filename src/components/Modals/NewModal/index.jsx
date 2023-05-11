import React from "react";
import styles from "../Modal.module.scss";
import ModalForm from "../ModalForm";

const NewModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

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
  
      if (!response.ok) {
        throw new Error(`Error creating venue: ${response.statusText}`);
      }
  
      const json = await response.json();
      console.log("Created venue data:", json);
  
      onClose();
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
          <ModalForm onSubmit={handleSubmit} rating={true} location={true} />
        </div>
      </div>
    </div>

  );
};

export default NewModal;
