import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';
import FileUpload from '../components/FileUpload';
import Slides from './Slides';

function CreateSlide(){
    return (
        <div className="section">
          <h2 className="title">Create Slide</h2>
          <div>
            <FileUpload/>
          </div>
          <div>
            <Slides/>
          </div>
        </div>
    )
}

export default CreateSlide;