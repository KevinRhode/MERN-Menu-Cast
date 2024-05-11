import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import FileUpload from '../components/FileUpload';
import Slides from './Slides';

function Dashboard(){
    return (
        <div className="section">
          <h2 className="title">Dashboard</h2>
          <div className='buttons'>
            <Link className='button is-link' to="/home">Home</Link>
            <Link className='button is-link' to="/createSlides">Create Slides</Link>
          </div>          
        </div>
            )};

export default Dashboard;