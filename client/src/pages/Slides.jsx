import React , { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Link } from 'react-router-dom';
import { GET_ALL_SLIDES } from '../utils/queries';
import { DELETE_SLIDE } from '../utils/mutations';
import { useStateContext } from '../utils/GlobalState';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const Slides = () => {

    const [deleteSlide, { loading:delLoading, error }] = useMutation(DELETE_SLIDE);
    const { state, dispatch } = useStateContext();

    const handleDeleteSlide = async (slideId) => {
      try {
        const gqlResponse = await deleteSlide({variables:{slideId}});
        deleteFile((gqlResponse.data.deleteSlide.filename +'.'+gqlResponse.data.deleteSlide.extname));
        dispatch({ type: 'REMOVE_SLIDE', payload: slideId });
        return gqlResponse.data;
      } catch (error) {
        return error;
      }           

  };
//id is filename.extname of the file on the server/public/uploads
  const deleteFile = async (id)=>{
    const response = await axios.delete(`/uploads/${id}`);
    console.log(response);
  }
   

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
            <button className='button' onClick={() => handleDeleteSlide(slide._id)}>Delete Slide</button>
          </div>
        ))
      )}
    </div>
    );

}
export default Slides;