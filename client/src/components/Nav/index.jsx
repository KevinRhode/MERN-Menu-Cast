import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Nav = () => {
    const {user, logout} = useAuth();

  return (
    <nav className='container'>
    <ul className='container' style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
      <li className='field'><Link className='button is-link' to="/">Home</Link></li>
      <li className='field'><Link className='button is-link' to="/about">About</Link></li>
      <li className='field'><Link className='button is-link' to="/services">Services</Link></li>
      <li className='field'><Link className='button is-link' to="/contact">Contact</Link></li>
      {user ? (<>
            <li className='field'><Link className='button is-link' to="/profile">Profile</Link></li>
            {/* <li className='field'>
              <button onClick={logout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Logout</button>
            </li> */}
          </>) : (<>
          </>)}
    </ul>
  </nav>
  );
};

export default Nav;