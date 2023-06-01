import React from 'react'
import styles from "./NoUser.module.scss";
import { useNavigate  } from 'react-router-dom';

/**
 * NoUser is a React component that displays a message to the user prompting them to log in, to be able to use function in the app only available for registered users.
 * 
 * 
 * The message can be customized via the `message` prop. When the "To login" button is clicked,
 * it redirects the user to the /login route using the `react-router-dom`'s useNavigate hook.
 *
 * @component
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - The message to display to the user. This should complete the sentence
 *                                 "Please log in to...", e.g., "view this page".
 *
 * @example
 * return (
 *   <NoUser message="view this page" />
 * )
*/

function NoUser({message}) {
  const navigate = useNavigate();
  return (
    <div className={styles.no_user_container}>
      <h1>Please log in to {message}</h1>
      <button className={styles.btn_to_login} onClick={(()=> navigate("/login"))}>To login</button>
    </div>
  )
}

export default NoUser