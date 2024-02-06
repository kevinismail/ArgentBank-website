import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/loginpage";
import HomePage from "./Pages/homepage";


const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

      
      </Routes>
    </Router>
  );
};

export default App;