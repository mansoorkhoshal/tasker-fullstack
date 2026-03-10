import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Navbar23 from "./Components/Navbar23";
import Footer from "./Components/Footer";

import LoginModal from "./Components/LoginModal";
import SignupModal from "./Components/SignupModal";

import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Work from "./pages/Work";
import Personal from "./pages/Personal";
import Learning from "./pages/Learning";
import Welcome from "./pages/Welcome";

import ProtectedRoute from "./Components/ProtectedRoute";

import { useSelector } from "react-redux";

const App = () => {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const token = useSelector(state => state.user.token);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      {token ? (
        <Navbar23 />
      ) : (
        <Navbar
          onLoginClick={() => {
            setIsLoginOpen(true);
            setIsSignupOpen(false);
          }}
          onSignupClick={() => {
            setIsSignupOpen(true);
            setIsLoginOpen(false);
          }}
        />
      )}

      {/* Main Content */}
      <main className="grow">

        <Routes>

          {/* Welcome page */}
          <Route
            path="/welcome"
            element={
              <Welcome
                onLoginClick={() => setIsLoginOpen(true)}
                onSignupClick={() => setIsSignupOpen(true)}
              />
            }
          />

          {/* Protected Routes */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
          />

          <Route
            path="/work"
            element={
              <ProtectedRoute>
                <Work />
              </ProtectedRoute>
            }
          />

          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <Personal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learning"
            element={
              <ProtectedRoute>
                <Learning />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      {/* Modals */}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;