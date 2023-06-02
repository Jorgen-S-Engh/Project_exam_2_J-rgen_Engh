import styles from "./SuccessMessage.module.scss";

/**
 * SuccessMessage is a React Component that displays a success message to the user.
 *
 * It receives a single prop, `message`, which is the success message string to be displayed.
 * This message is then rendered within a styled div.
 *
 * The component uses SCSS modules for styling, with styles imported from 'SuccessMessage.module.scss'.
 *
 * This component is used in scenarios where the application needs to provide a successful
 * feedback to the user, for example, after successful form submission, data upload, etc.
 *
 * @component
 * @example
 * <SuccessMessage message="Data uploaded successfully." />
 *
 * @param {Object} props - The props that were defined by the caller of this component.
 * @param {string} props.message - The success message to display.
 */
function SuccessMessage({ message }) {
  return <div className={styles.success_message}>{message}</div>;
}

export default SuccessMessage;
