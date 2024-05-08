import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Nav = () => {
    const {user, logout} = useAuth();

  return (
    <nav>
    <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      {user ? (<>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={logout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Logout</button>
            </li>
          </>) : (<>
          </>)}
    </ul>
  </nav>
  );
};

export default Nav;