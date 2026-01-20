import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Modals
import LoginModal from "./Components/LoginModal";
import SignupModal from "./Components/SignupModal";

// Pages
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Work from "./pages/Work";
import Personal from "./pages/Personal";
import Learning from "./pages/Learning";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/work" element={<Work />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/learning" element={<Learning />} />
      </Routes>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(e) => {
          e.preventDefault();
          console.log("Login submitted");
          setIsLoginOpen(false);
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
