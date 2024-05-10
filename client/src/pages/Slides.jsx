import React , { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Link } from 'react-router-dom';
import { GET_ALL_SLIDES } from '../utils/queries';

const Slides = () => {
    const { loadingSlides, errorSlides, dataSlides } = useQuery(GET_ALL_SLIDES);  
    
    if (loadingSlides) return <p>Loading Slides...</p>;
    const [listState, setListState] = useState([]); 

    return (
        <div className="">            
      {listState.length === 0 ? (
        <p>No slides available</p>
      ) : (
        listState.map((slide) => (
          <div key={slide._id}>
           <img src={`/uploads/${slide.filename}.${slide.extname}`} alt={slide.filename} />
            <p>{slide.filename}</p>
          </div>
        ))
      )}
    </div>
    );

}
export default Slides;