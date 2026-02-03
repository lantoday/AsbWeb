import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import * as styles from "./app.module.scss";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { RegisterCardForm } from "./components/RegisterCardForm/RegisterCardForm";
import { ASBCulture } from "./components/ASBCulture/ASBCulture";
import { AboutMe } from "./components/AboutMe/AboutMe";
import { WelcomeSection } from "./components/WelcomeSection/WelcomeSection";

const AppContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getViewTitle = () => {
    switch (location.pathname) {
      case "/AsbCulture":
        return "ASB Culture";
      case "/AboutMe":
        return "About me";
      default:
        return "Register card form";
    }
  };

  return (
    <div data-testid="app__container">
      <Header
        onBurgerClick={toggleMenu}
        onBackClick={() => navigate("/")}
        showBack={location.pathname !== "/"}
        title={getViewTitle()}
      />
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(path) => {
          if (path === "asb-culture") navigate("/AsbCulture");
          else if (path === "about-me") navigate("/AboutMe");
          else navigate("/");
        }}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <WelcomeSection />
                <div>
                  <RegisterCardForm />
                </div>
              </div>
            }
          />
          <Route
            path="/AsbCulture"
            element={
              <div data-testid="app__asb-culture-page">
                <ASBCulture />
              </div>
            }
          />
          <Route
            path="/AboutMe"
            element={
              <div data-testid="app__about-me-page">
                <AboutMe />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
