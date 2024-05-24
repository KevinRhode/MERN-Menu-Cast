import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';

import { useStateContext } from '../utils/GlobalState';
import Slides from './Slides';
import { useMutation } from '@apollo/client';
import { ADD_SLIDESHOW, DELETE_SLIDESHOW } from '../utils/mutations';
import './createslideshow.css';

function Slideshow(){

  const { state, dispatch } = useStateContext();
  const [formState, setFormState] = useState({errorMessage:''});
  const [addSlideShow, {error}] = useMutation(ADD_SLIDESHOW);
  const [deleteSlideshow, {error: errorDelete}] = useMutation(DELETE_SLIDESHOW);

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
  const handleDelete = async (slideshowID) => {

    deleteSlideshow({variables:{slideshowId:slideshowID}});
    dispatch({type: 'REMOVE_SLIDESHOW', payload: slideshowID});
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
              <button onClick={() => handleDelete(slideshow._id)} className='button is-danger'>Delete</button>
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

     
        </div>
    )
}

export default Slideshow;