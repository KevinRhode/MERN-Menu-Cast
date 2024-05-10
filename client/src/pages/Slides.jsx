import React , { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Link } from 'react-router-dom';
import { GET_ALL_SLIDES } from '../utils/queries';
import { useStateContext } from '../utils/GlobalState';

const Slides = () => {
    // const { loading:loadingSlides, error:errorSlides, data:dataSlides } = useQuery(GET_ALL_SLIDES);  
    // const {state, dispatch} = useStateContext();

    // if (loadingSlides) return <p>Loading Slides...</p>;
    
    const { loading, data } = useQuery(GET_ALL_SLIDES);
    const { state, dispatch } = useStateContext();

    useEffect(() => {
        if (data && !loading) {
            dispatch({ type: 'SET_SLIDES', payload: data.getAllslides });
        }
    }, [data, loading, dispatch]);

    if (loading) return <p>Loading Slides...</p>;
    if (!state.Slides) return <p>No slides available</p>;
    return (
        <div className="">            
      {state.Slides.length === 0 ? (
        <p>No slides available</p>
      ) : (
        state.Slides.map((slide) => (
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