import React from 'react'
import styles from "./ErrorMessage.module.scss";

function ErrorMessage() {
  return (
    <div className={styles.error_message}>Something went wrong, please try again</div>
  )
}

export default ErrorMessage;