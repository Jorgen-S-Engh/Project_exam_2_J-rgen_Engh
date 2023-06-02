import React, { useState } from "react";
import styles from "../Modal.module.scss";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";

/**
 * ChangeAvatarModal is a React component that presents a modal form for changing the user's avatar.
 *
 * This component accepts the current avatar's URL as an input and attempts to change the avatar
 * by making a call to the passed in `onAvatarChange` function. If the function returns a success,
 * a success message is displayed and the modal automatically closes after 5 seconds. If an error occurs,
 * the error message is displayed instead.
 *
 * The visibility of the modal can be controlled externally through the `show` prop and can be closed
 * by calling the `onClose` function.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Determines whether the modal is visible or not
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onAvatarChange - Function to handle avatar change. It should return an object with a `success` boolean and `error` message
 *
 * @example
 * return (
 *   <ChangeAvatarModal show={modalVisible} onClose={closeModal} onAvatarChange={changeAvatar} />
 * )
 */

const ChangeAvatarModal = ({ show, onClose, onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [apiError, setApiError] = useState(false);
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
        <div>
          <h1>Change Avatar</h1>
          <form onSubmit={handleSubmit} className={styles.change_avatar_form}>
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(event) => setNewAvatarUrl(event.target.value)}
              placeholder="New avatar URL"
              required
            />
            <button type="submit" className={styles.btn_submit}>
              Submit
            </button>
          </form>
        </div>
        {apiError && <ErrorMessage message={apiError} />}
        {success && <SuccessMessage message={"Avatar updated successfully!"} />}
      </div>
    </div>
  ) : null;
};

export default ChangeAvatarModal;
