import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';

import { useStateContext } from '../utils/GlobalState';
import Slides from './Slides';
import { useMutation } from '@apollo/client';
import { ADD_SLIDESHOW, DELETE_SLIDESHOW } from '../utils/mutations';
import './createslideshow.css';

function Slideshow(){

  const { state, dispatch } = useStateContext();
  const [formState, setFormState] = useState({errorMessage:''});
  const [showModal, setShowModal] = useState(false);
  const [slideshowId, setslideshowIdSelected] = useState('');
  const [addSlideShow, {error}] = useMutation(ADD_SLIDESHOW);
  const [deleteSlideshow, {error: errorDelete}] = useMutation(DELETE_SLIDESHOW);
  const navigate = useNavigate();


  const promptDelete = (selectedId) => {
    setslideshowIdSelected(selectedId);
    setShowModal(true);
  }
  const handleChange = (event) => {    
    const { value } = event.target;
    dispatch({type:'SET_SLIDESHOWNAME', payload:value})
    
  };

  const handleCardClick = (slideId) => {  
      
    const index = state.SelectedSlides.indexOf(slideId)

    if (index !== -1) {
      // if the string is found, remove it
      dispatch({ type: 'REMOVE_SELECTEDSLIDE', payload: slideId });
      

    } else {
      // else the string is added to the list
      dispatch({ type: 'ADD_SELECTEDSLIDE', payload: slideId });
      
    }
  
  };
  const handleDelete = async () => {

    deleteSlideshow({variables:{slideshowId:slideshowId}});
    dispatch({type: 'REMOVE_SLIDESHOW', payload: slideshowId});
    setShowModal(false);
    return;
  };
  const handleCreateSlideShow = async () => {

    if (!state.slideshowName) {
      setFormState({ ...formState, errorMessage: 'Slideshow name is required' });
      return;
    }
    if (state.SelectedSlides.length === 0) {
      setFormState({ ...formState, errorMessage: 'At least one slide must be selected' });
      return;
    }

    try {
       //take the state of selectedSlides and create a new slideshow
    const createShow = await addSlideShow({variables:{slides:[...state.SelectedSlides],slideshowName:state.slideshowName}})
    dispatch({type: 'ADD_SLIDESHOW', payload: createShow.data.addSlideshow});
    dispatch({type: 'SET_SELECTEDSLIDE', payload: ''})
    setFormState({errorMessage:''});

    //
    } catch (error) {
      setFormState({errorMessage:error.message});
    }
   
  }
///slideshow/:slideshowId
  const handleViewEdit = (id) => {
    navigate(`/slideshow/${id}`);
  }
  
  
    return (
        <div className="">
          
          <div className='container'>
            {state.SlideShow.length === 0 ? 
            (<p>No Slideshows available</p>)
            :
            (state.SlideShow.map((slideshow)=>(
            <div key={slideshow._id} className='slideshows'>
              <p>{slideshow.slideshowName}</p>
              <p>{slideshow.comment}</p>
              <button onClick={() => promptDelete(slideshow._id)} className='button is-danger'>Delete Slideshow</button>
              <button onClick={() => handleViewEdit(slideshow._id)} className='button is-secondary'>View</button>
              <button onClick={() => handleViewEdit(slideshow._id)} className='button is-secondary'>Edit</button>
            </div>
            )))}
          </div>
          <div className='container'>
          <label className='label' htmlFor="slideshowName">Slideshow Name: </label>
     <input
          className='input'
          placeholder=""
          name="slideshowName"
          type="text"
          id="slideshowName"
          onChange={handleChange}          
        />
      {formState.errorMessage && <p>{formState.errorMessage}</p>}
       <button className='button is-primary' onClick={handleCreateSlideShow} >Create Slide Show</button>
</div>
      <Slides onCardClick={handleCardClick}/>


      <div id="modal-js-example" className={`modal ${showModal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => {setShowModal(false); setslideshowIdSelected('');}}></div>
        <div className="modal-content section">
         
          <div className="box">
          <h2 className='title'>Confirmation</h2>            
            <p className='field'>Are you sure you want to delete this slide?</p>
            <div className='buttons'>
            <button className='button is-success' onClick={() => handleDelete()}>Confirm Delete</button>
            <button className='button is-success' onClick={() => {setShowModal(false); setslideshowIdSelected('');}}>Cancel</button>
            </div>
            
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => {setShowModal(false); setslideshowIdSelected('');}}></button>
      </div>
     
        </div>
    )
}

export default Slideshow;