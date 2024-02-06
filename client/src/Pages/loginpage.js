import Footer from "../Components/footer";
import "../Style/main.css";
import React, { useState } from 'react';

const LoginPage = () => {
    // Define formData state with an initial value
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
  
    // Define an error state with an initial value
    const [error, setError] = useState('');
  
    // Define the handleInputChange function
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    // Define the handleSignIn function
    const handleSignIn = (event) => {
      event.preventDefault(); // Prevent default form submission
      // Logic to handle sign in goes here
      // For example, validate formData and make an API call
    };
return (
    <div className="login-page">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="username"
              />

              {error && <span style={{ color: "red" }}>{error}</span>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              type="button"
              className="sign-in-button"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default LoginPage;