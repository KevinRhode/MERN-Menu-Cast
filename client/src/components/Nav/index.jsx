import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Nav = () => {
    const {user} = useAuth();

  return (
    <nav >
    <ul className='container' style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
      <li className='field'><Link className='button is-link' to="/">Home</Link></li>
      <li className='field'><Link className='button is-link' to="/about">About</Link></li>
      
      {user ? (<>
            <li className='field'><Link className='button is-link' to="/profile">Profile</Link></li>           
          </>) : (<>
          </>)}
    </ul>
  </nav>
  );
};

export default Nav;