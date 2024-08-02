import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Dashboard(){
    return (
        <div className="section">
          <h2 className="title">Dashboard</h2>
          <div className='buttons' >
            <Link className='button is-link dash' to="/home">Home</Link>
            <Link className='button is-link dash' to="/createSlides">Create Slides</Link>
            <Link className='button is-link dash' to='/createSlideshows'>Create Slideshows</Link>
            <Link className='button is-link dash' to="/createEndpoints">Create Endpoint</Link>
          </div>          
        </div>
            )};

export default Dashboard;