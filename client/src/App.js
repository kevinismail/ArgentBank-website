import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/loginpage";
import HomePage from "./Pages/homepage";
import UserPage from "./Pages/userpage"
import ErrorPage from './Pages/error';

import "./Style/main.css"





const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<ErrorPage />} />

      
      </Routes>
    </Router>
  );
};

export default App;