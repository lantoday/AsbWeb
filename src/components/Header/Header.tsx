import React from "react";
import * as styles from "./Header.module.scss";

interface HeaderProps {
  onBurgerClick: () => void;
  onBackClick: () => void;
  showBack: boolean;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({
  onBurgerClick,
  onBackClick,
  showBack,
  title,
}) => {
  return (
    <header className={styles.header} data-testid="header__container">
      {showBack ? (
        <button
          aria-label="Go back to register card form"
          onClick={onBackClick}
          className={styles.backButton}
          data-testid="header__back-button"
        >
          ←
        </button>
      ) : (
        <button
          aria-label="Open menu"
          onClick={onBurgerClick}
          className={styles.burgerButton}
          data-testid="header__burger-button"
        >
          ☰
        </button>
      )}
      <div className={styles.title} data-testid="header__title">
        {title}
      </div>
    </header>
  );
};
