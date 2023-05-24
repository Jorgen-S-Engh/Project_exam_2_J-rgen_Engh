import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import styles from "./Spinner.module.scss";

const override = css`
  display: flex;
  justify-content:center;
  margin: 0 auto;
  border-color: red;
`;

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
