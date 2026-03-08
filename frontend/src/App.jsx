import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import LoginModal from "./Components/LoginModal";
import SignupModal from "./Components/SignupModal";

import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Work from "./pages/Work";
import Personal from "./pages/Personal";
import Learning from "./pages/Learning";

import { useSelector } from "react-redux";
import Navbar23 from "./Components/Navbar23";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const token = useSelector(state => state.user.token);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      {
        token ? (
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
        )
      }

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/work" element={<Work />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </main>

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

    </div>
  );
};

export default App;