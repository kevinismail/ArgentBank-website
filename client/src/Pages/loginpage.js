import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import "../Style/main.css";
import { signIn } from '../redux/api/api'; 

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      await signIn(formData.username, formData.password, dispatch, navigate);
      // If signIn is successful, you might want to clear the form or navigate away
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

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
                name="username" // Add name attribute for handleInputChange
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="username"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password" // Add name attribute for handleInputChange
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
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
