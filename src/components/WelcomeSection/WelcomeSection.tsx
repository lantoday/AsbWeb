import React from "react";
import * as styles from "./WelcomeSection.module.scss";
import { useUser } from "../../UserContext";
import { LoadingIcon } from "../LoadingIcon/LoadingIcon";

export const WelcomeSection: React.FC = () => {
  const { user, loading, error } = useUser();

  if (loading) return <LoadingIcon />;

  if (error) {
    // TODO: Should have an error state design with non-hardcoded text
    return (
      <div
        className={styles.welcomeSection}
        data-testid="welcome-section__profile-error"
      >
        <p style={{ color: "red" }}>Failed to load user profile.</p>
      </div>
    );
  }

  return (
    <div
      className={styles.welcomeSection}
      data-testid="welcome-section__container"
    >
      {user && (
        <h1 data-testid="welcome-section__welcome-message">
          Welcome {user.FirstName}
        </h1>
      )}
    </div>
  );
};
