import React , { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Link } from 'react-router-dom';
import { DELETE_SLIDE } from '../utils/mutations';
import { useStateContext } from '../utils/GlobalState';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import ConfirmationModal from '../components/ConfirmationModal'
import './slides.css';

const Slides = (props) => {

    const [deleteSlide, { loading:delLoading, error }] = useMutation(DELETE_SLIDE);
    const { state, dispatch } = useStateContext();
    const [showModal, setShowModal] = useState(false);
    const [slideId, setSlideIdSecelted] = useState('');
    const promptDelete = (selectedId) => {
      setSlideIdSecelted(selectedId);
      setShowModal(true);
    }
    const handleDeleteSlide = async () => {
      try {
        const gqlResponse = await deleteSlide({variables:{slideId}});
        deleteFile((gqlResponse.data.deleteSlide.filename +'.'+gqlResponse.data.deleteSlide.extname));
        dispatch({ type: 'REMOVE_SLIDE', payload: slideId });
        setSlideIdSecelted('');
        setShowModal(false);
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
        <div className="card-container section">            
      {state.Slides.length === 0 ? (
        <p>No slides available</p>
      ) : (
        state.Slides.map((slide) => (          
          <div
          //prove the onclick if prop is given otherwise on onClick for the card
           {...(props.onCardClick ? {onClick:()=> props.onCardClick(slide._id)}:{} )}
           className={`card ${state.SelectedSlides.includes(slide._id) ? 'selected' : ''}`} 
           key={slide._id}>
           <img src={`/uploads/${slide.filename}.${slide.extname}`} alt={slide.filename} />
            <p>{slide.filename}</p>
            <button className='button is-danger ' onClick={() => promptDelete(slide._id)} >Delete Slide</button> 
            {/*  */}
          </div>
        ))
      )}
     <div id="modal-js-example" className={`modal ${showModal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => {setShowModal(false); setSlideIdSecelted('');}}></div>
        <div className="modal-content section">
         
          <div className="box">
          <h2 className='title'>Confirmation</h2>            
            <p className='field'>Are you sure you want to delete this slide?</p>
            <div className='buttons'>
            <button className='button is-success' onClick={() => handleDeleteSlide()}>Confirm Delete</button>
            <button className='button is-success' onClick={() => {setShowModal(false); setSlideIdSecelted('');}}>Cancel</button>
            </div>
            
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => {setShowModal(false); setSlideIdSecelted('');}}></button>
      </div>
      
    </div>
    );

}
export default Slides;