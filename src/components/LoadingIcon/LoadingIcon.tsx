import React from "react";
import * as styles from "./LoadingIcon.module.scss";

export const LoadingIcon: React.FC = () => {
  return (
    <div className={styles.loader} data-testid="loading-icon__container">
      <div className={styles.spinner}></div>
    </div>
  );
};
