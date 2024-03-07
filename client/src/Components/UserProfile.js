import React, { useEffect, useState } from 'react';
import EditProfileForm from './EditProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/api/api';



const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token); 
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProfile(token, dispatch); 
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du profil :', error);
      }
    };

    fetchData();
  }, [token, dispatch]); 
  

  const handleEditButtonClick = () => {
    setIsEditing(true);
  }; 


  return (
    <main className="main bg-dark">
      <div className="header">
        <div>
        {!isEditing && <h1>Welcome back<br />{user.userName}</h1>}
        </div>
        {isEditing ? (
          <EditProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <div className='edit-button-container'>
            <button className="edit-button" onClick={handleEditButtonClick}>
              Edit Name
            </button>
            
          </div>
        )}
      </div>
    </main>
  );
};

export default UserProfile;