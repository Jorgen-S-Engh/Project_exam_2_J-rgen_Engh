import ErrorMessage from "../ErrorMessage"
import { useNavigate  } from 'react-router-dom';
import styles from "./CatchError.module.scss";

function CatchError({errorMessage}) {
  const navigate = useNavigate()
  return (
    <div className={styles.Catch_error}>
      <ErrorMessage message={errorMessage}/>
      <button className={styles.btn_to_home} onClick={() => navigate("/")} >Back to home</button>
    </div>
  )
}

export default CatchError