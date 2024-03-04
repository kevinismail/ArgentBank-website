// EditProfileForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../redux/api/api';

const EditProfileForm = ({ onCancel }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editedUsername, setEditedUsername] = useState(user.userName); 
  const [firstname, setFirstname] = useState(user.firstName); 
  const [lastname, setLastname] = useState(user.lastName); 
 

  // Mettez à jour editedUsername lorsque user.userName change
  useEffect(() => {
    setEditedUsername(user.userName);
  }, [user.userName]);

  const handleSaveButtonClick = async () => {
    await updateUsername(token, editedUsername, dispatch);
    // Mettez à jour d'autres informations si nécessaire

    // Réinitialisez le champ d'édition et revenez à l'affichage du nom d'utilisateur
    setEditedUsername("");
    onCancel();
  };

  return (
    <div className='editProfil-main'>
      <h2 className='editTitle'>Edit user info</h2>
      <div className='editProfil-container'>
        <label className='editLabelProfil' htmlFor="editedUsername">User name:</label>
        <input className='editProfilInput'
          type="text"
          id="editedUsername"
          value={editedUsername}
          onChange={(e) => setEditedUsername(e.target.value)}
        />
      </div>
      <div className='editProfil-container'>
        <label className='editLabelProfil' htmlFor="editedUsername">First name:</label>
        <input className='editProfilInput'
          type="text"
          id="editedFirstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          readOnly
        />
      </div>
      <div className='editProfil-container'>
        <label className='editLabelProfil' htmlFor="editedUsername">Last name:</label>
        <input className='editProfilInput'
          type="text"
          id="editedLastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          readOnly
        /> 
      </div>
      <div className='editProfilButtonContainer'>
        <button className='editProfilButton' onClick={handleSaveButtonClick}>Save</button>
        <button className='editProfilButton' onClick={onCancel}>Cancel</button>
      </div>
      
      
       
      
    </div>
  );
};

export default EditProfileForm;