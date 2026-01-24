import { useEffect, useState } from "react";
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
import TaskCard from "./Components/TaskCard";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [taskStore, setTaskStore] = useState([])


  useEffect(() => {
    fetch('http://localhost:4000/api/task/')
      .then((resposne) => {
        if (resposne.status == 200 || resposne.status == 201) {
          resposne.json()
            .then((jsonData) => {
              console.log(jsonData)
              setTaskStore(jsonData.data)
            })
        }
      })
  }, [])

  return (
    <>
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/work" element={<Work />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/learning" element={<Learning />} />
      </Routes>

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


      {
        taskStore && taskStore.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No tasks found. Start by adding one
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-10"
          >
            {taskStore.map(task => (
              <TaskCard
                key={task._id || task.id}
                items={task}
                progress={task.progress || 0}
              />
            ))}
          </div>
        )}

      < Footer />
    </>
  );
};

export default App;
