import React, { useState } from "react";
import styles from "../Modal.module.scss";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";


const ChangeAvatarModal = ({ show, onClose, onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [apiError, setApiError] =useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await onAvatarChange(newAvatarUrl);
  
    if (result.success) {
      setSuccess(true);
      setApiError(false);
    } else {
      setSuccess(false);
      setApiError(result.error);
    }
  
    setTimeout(() => {
      onClose();
    }, 5000); 
  };
  

  return show ? (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <div >
          <h1>Change Avatar</h1>
          <form onSubmit={handleSubmit} className={styles.change_avatar_form}>
            <input 
              type="text"
              value={newAvatarUrl}
              onChange={event => setNewAvatarUrl(event.target.value)}
              placeholder="New avatar URL"
              required
            />
            <button type="submit" className={styles.btn_submit}>Submit</button>
          </form>
        </div>
        {apiError && <ErrorMessage message={apiError}/>}
        {success && <SuccessMessage message={"Avatar updated successfully!"}/>}

      </div>
    </div>
  ) : null;
};

export default ChangeAvatarModal;
