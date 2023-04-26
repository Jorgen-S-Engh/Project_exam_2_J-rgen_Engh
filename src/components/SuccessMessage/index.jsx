import styles from "./SuccessMessage.module.scss";


function SuccessMessage({message}) {
  return (
    <div className={styles.success_message}>
    {message}
    </div>
  );
}

export default SuccessMessage;
