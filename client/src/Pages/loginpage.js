  import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import Navbar from "../Components/navbar";
  import Footer from "../Components/footer";
  import { setUsernameAndPassword, clearUsernameAndPassword } from '../redux/reducers/authSlice'; 

  import { signIn,} from '../redux/api/api'; 

  const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      username: '',
      password: ''
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);



  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      if (name === 'username') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setEmailError("Invalid email address");
        } else {
          setEmailError("");
        }
      }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (emailError) {
      return;
    }
    // Passer l'état actuel de la case "Remember me" à la fonction signIn
    const success = await signIn(formData.username, formData.password, dispatch, navigate, rememberMe);
    if (!success) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    } else {
      setError('');
      // Si la connexion est réussie, save les informations de connexion si la case "Remember me" est cochée
      if (rememberMe) {
        dispatch(setUsernameAndPassword({ username: formData.username, password: formData.password }));
      } else {
        // Si la case "Remember me" n'est pas cochée, delete les informations de connexion du store Redux
        dispatch(clearUsernameAndPassword());
      }
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setFormData(prevState => ({
        ...prevState,
        username: storedUsername,
        password: storedPassword
      }));
      setRememberMe(true); // pour check si remember me est coché 
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
                  name="username"
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
