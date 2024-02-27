import { setToken, setUser, setUsername } from "client/src/redux/slices/slice.js";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

// Fonction pour la connexion de l'utilisateur.
export const signIn = async (username, password, dispatch, navigate) => {
  // Création de l'objet contenant les informations de connexion.
  const data = {
    email: username,
    password: password,
  };

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Extraction du token depuis la réponse JSON.
      const responseData = await response.json();
      const token = responseData.body.token;

      // Dispatche le token dans le Redux store
      dispatch(setToken(token));           

      navigate('/user');
    } else {
      // Affiche une erreur en cas de problème avec la requête de connexion.
      console.error('Erreur lors de la requête de connexion:', response.status, response.statusText);
    }
  } catch (error) {
    // Affiche une erreur en cas d'erreur lors de l'exécution de la requête.
    console.error("Erreur lors de la requête:", error);
  }
};

// Fonction pour récupérer le profil de l'utilisateur.
export const fetchUserProfile = async (token, dispatch) => {
  try {
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data.body));
      dispatch(setUsername(data.body.userName));

    } else {
      console.error('Erreur lors de la requête de profil:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
  }
};

// Fonction pour mettre à jour le nom d'utilisateur.
export const updateUsername = async (token, newUsername, dispatch) => {
  try {
    
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName: newUsername }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUsername(data.body.userName));
    } else {
      const errorData = await response.json();
      throw new Error(`Erreur lors de la requête: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
  }
};