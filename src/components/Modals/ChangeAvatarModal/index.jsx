import React, { useState } from "react";
import styles from "../Modal.module.scss";

const ChangeAvatarModal = ({ show, onClose, onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAvatarChange(newAvatarUrl);
    onClose();
  };

  return show ? (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        <div className={styles.scrollable_content}>
          <h1>Change Avatar</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text"
              value={newAvatarUrl}
              onChange={event => setNewAvatarUrl(event.target.value)}
              placeholder="New avatar URL"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChangeAvatarModal;
