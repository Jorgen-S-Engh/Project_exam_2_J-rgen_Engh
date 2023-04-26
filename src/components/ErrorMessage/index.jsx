import React from 'react'
import styles from "./ErrorMessage.module.scss";

function ErrorMessage({message}) {
  return (
    <div className={styles.error_message}>The following Error occured: {message}</div>
  )
}

export default ErrorMessage;