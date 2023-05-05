import styles from '../Modal.module.scss';

const NewModal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        {children}
        <button className={styles.close_button} onClick={onClose}>
          Close
        </button>
        <p>Hei hei dette er New modal</p>
      </div>
    </div>
  );
};

export default NewModal;
