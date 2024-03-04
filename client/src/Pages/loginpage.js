import React, { useState, useEffect } from 'react'; // Ajoutez useEffect ici
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";

import { signIn } from '../redux/api/api'; 

const LoginPage = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
    username: '',
    password: ''
 });
 const [error, setError] = useState('');
 const [emailError, setEmailError] = useState(''); // Nouvel état pour l'erreur d'email

 const [rememberMe, setRememberMe] = useState(false);

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Vérifiez si l'utilisateur a modifié l'email
    if (name === 'username') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError(""); // Réinitialisez l'erreur si l'email est valide
      }
    }
 };

 const handleSignIn = async (event) => {
    event.preventDefault();
    if (emailError) {
      return; // Ne continuez pas si l'email n'est pas valide
    }
    const success = await signIn(formData.username, formData.password, dispatch, navigate);
    if (!success) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    } else {
      setError(''); // Réinitialisez l'état d'erreur
      if (rememberMe) {
        // Stocker les identifiants et le mot de passe dans localStorage
        localStorage.setItem('username', formData.username);
        localStorage.setItem('password', formData.password);
      }
    }
 };

 useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  if (storedUsername && storedPassword) {
      console.log("Username et password récupérés de localStorage :", storedUsername, storedPassword);
      setFormData(prevState => ({
        ...prevState,
        username: storedUsername,
        password: storedPassword
      }));
      setRememberMe(true); // Assurez-vous que la case "Remember me" est cochée
  } else {
      console.log("Aucun username ou password trouvé dans localStorage.");
  }
 }, []);
 
 

 return (
    <div className="login-page">
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSignIn}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username" // rajoute l'attribut name pour le hanleInputChange
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="username"
              />
               {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}/>
              
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer/>
    </div>
 );
}

export default LoginPage;
