import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import { Link } from 'react-router-dom';



const Account = () => {
    const {user, logout} = useAuth();

  return (
    <>
     
      {user ? (<>
        <h2>Hello </h2>
            
              <button className='button is-primary' onClick={logout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Logout</button>
            
          </>) : (<>
          </>)}
    </>

       
  
  );
};

export default Account;