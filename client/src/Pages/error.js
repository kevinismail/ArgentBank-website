import React from 'react';
import { Link } from 'react-router-dom';
import { default as TakenSVG } from '../images/undraw_Taken.webp'
const ErrorPage = () => {
 return (
   <div className='error-page'> 
     <h1>Erreur 404</h1>
     <p>La page que vous recherchez n'existe pas.</p>
     <Link to="/" className="visible-link">Retour à la page d'accueil</Link>
     <img src={TakenSVG} alt="oh une soucoupe" />
   
   </div>
 );
};

export default ErrorPage;