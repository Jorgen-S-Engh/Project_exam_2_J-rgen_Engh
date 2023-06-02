import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import styles from "./Spinner.module.scss";

const override = css`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  border-color: red;
`;

/**
 * Spinner is a React Component that provides a loading spinner.
 *
 * It utilizes the `ClipLoader` component from the `react-spinners` library.
 *
 * The color and loading state of the spinner can be adjusted using the `useState` hooks.
 * The size of the spinner is set to 150, and the display settings are provided by the
 * `css` attribute, which uses Emotion (a library for writing CSS in JS).
 *
 * This spinner is generally used when the app is performing actions that require a waiting time.
 *
 * @component
 * @example
 * <Spinner />
 */

function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#04BFBF");

  return (
    <div className={styles.spinner}>
      <div className="sweet-loading">
        <ClipLoader
          color={color}
          loading={loading}
          css={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Spinner;
