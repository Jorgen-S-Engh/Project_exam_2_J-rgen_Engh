import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

/**
 * PageNotFound is a React component that displays a "Page not found" message to the user
 * when they navigate to a non-existent route.
 *
 * It includes a "Return to home" button which, when clicked, navigates the user back to the
 * home page ("/") using the `react-router-dom`'s useNavigate hook.
 *
 * @component
 *
 * @example
 * return (
 *   <PageNotFound />
 * )
 */

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page_not_found}>
      <h1>Page not found</h1>
      <button className={styles.to_home} onClick={() => navigate("/")}>
        Return to home
      </button>
    </div>
  );
}

export default PageNotFound;
