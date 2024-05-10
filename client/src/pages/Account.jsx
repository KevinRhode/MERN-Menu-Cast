import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { Link } from 'react-router-dom';



const Account = () => {
    const {user, logout} = useAuth();

  return (
    <div className='section'>
     
      {user ? (<div className='container'>
        <h2 className='title'>Hello {user.data.firstName}</h2>
        
        <button className='button is-primary' onClick={logout} >Logout</button>
            
          </div>) : (<>
          </>)}
    </div>

       
  
  );
};

export default Account;