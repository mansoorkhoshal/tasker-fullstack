import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Work from "./pages/Work";
import Personal from "./pages/Personal";
import Learning from "./pages/Learning";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/work" element={<Work />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/learning" element={<Learning />} />
      </Routes>
    </>
  );
};

export default App;
