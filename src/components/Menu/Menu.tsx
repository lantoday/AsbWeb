import React from "react";
import * as styles from "./Menu.module.scss";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      data-testid="menu__overlay"
    >
      <nav
        className={styles.menu}
        onClick={(e) => e.stopPropagation()}
        data-testid="menu__nav"
      >
        <ul data-testid="menu__list">
          <li
            data-testid="menu__item-asb-culture"
            role="button"
            tabIndex={0}
            onClick={() => {
              onNavigate("asb-culture");
              onClose();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onNavigate("asb-culture");
                onClose();
              }
            }}
          >
            ASB Culture
          </li>
          <li
            data-testid="menu__item-about-me"
            role="button"
            tabIndex={0}
            onClick={() => {
              onNavigate("about-me");
              onClose();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onNavigate("about-me");
                onClose();
              }
            }}
          >
            About me
          </li>
        </ul>
      </nav>
    </div>
  );
};
