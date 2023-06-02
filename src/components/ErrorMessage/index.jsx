import React from "react";
import styles from "./ErrorMessage.module.scss";

/**
 * Component for displaying error messages.
 *
 * @component
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.message - The error message to display.
 *
 * @returns {JSX.Element} The ErrorMessage component.
 *
 * @example
 * return (
 *   <ErrorMessage message="This is an error message." />
 * )
 */

function ErrorMessage({ message }) {
  return (
    <div className={styles.error_message}>
      The following Error occured: {message}
    </div>
  );
}

export default ErrorMessage;
