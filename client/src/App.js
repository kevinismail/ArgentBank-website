import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/loginpage";
import HomePage from "./Pages/homepage";
import UserPage from "./Pages/userpage"
import "./Style/main.css"
// Dans votre composant principal ou dans un hook personnalisé
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from './redux/api/api'; // Assurez-vous que cette fonction est exportée

const useRestoreUserSession = () => {
 const dispatch = useDispatch();

 useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Restaurer l'état de connexion de l'utilisateur
      fetchUserProfile(token, dispatch);
    }
 }, [dispatch]);
};




const App = () => {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />

      
      </Routes>
    </Router>
  );
};

export default App;