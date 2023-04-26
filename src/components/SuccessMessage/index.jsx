import styles from "./SuccessMessage.module.scss";


function SuccessMessage() {
  return (
    <div className={styles.success_message}>
      Account created successfully! Redirecting to login
    </div>
  );
}

export default SuccessMessage;
