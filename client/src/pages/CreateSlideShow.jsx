import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';

import { useStateContext } from '../utils/GlobalState';
import Slides from './Slides';
import { useMutation } from '@apollo/client';
import { ADD_SLIDESHOW } from '../utils/mutations';

function CreateSlideShow(){

  const { state, dispatch } = useStateContext();
  const [formState, setFormState] = useState({slideshowName:'',errorMessage:''});
  const [addSlideShow, {error}] = useMutation(ADD_SLIDESHOW);

  const handleChange = (event) => {    
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCardClick = (slideId) => {  
      
    const index = state.SelectedSlides.indexOf(slideId)

    if (index !== -1) {
      // if the string is found, remove it
      dispatch({ type: 'REMOVE_SELECTEDSLIDE', payload: slideId });
      // setFormState({
      //   ...formState, 
      //   selectedSlides:formState.selectedSlides.filter(slide => slide !== slideId)
      
      // });

    } else {
      // else the string is added to the list
      dispatch({ type: 'ADD_SELECTEDSLIDE', payload: slideId });
      // setFormState({
      //   ...formState,
      //   selectedSlides: [...formState.selectedSlides, slideId],
      // });
    }
  
  };
  const handleCreateSlideShow = async () => {

    try {
       //take the state of selectedSlides and create a new slideshow
    const createShow = await addSlideShow({variables:{slides:[...state.SelectedSlides],slideshowName:formState.slideshowName}})
    dispatch({type: 'ADD_SLIDESHOW', payload: createShow.data.addSlideshow});
    //
    } catch (error) {
      setFormState({errorMessage:error});
    }
   console.log(state);
  }

    return (
        <div className="">
          <h2 className="title">Create Slide Show</h2>
          <div className='container'>
          <label className='label' htmlFor="slideshowName">Slideshow Name: </label>
      {formState ? (<input
        className='input'
        placeholder=""
        name="slideshowName"
        type="String"
        id="slideshowName"
        onChange={handleChange}
        value={formState.slideshowName}
      />) : (<input
        className='input'
        placeholder=""
        name="slideshowName"
        type="String"
        id="slideshowName"
        onChange={handleChange}
      />)}
      {formState.errorMessage ? (<></>):(<p>{formState.errorMessage}</p>)}
       <button className='button is-primary' onClick={handleCreateSlideShow} >Create Slide Show</button>
</div>
      <Slides onCardClick={handleCardClick} listSelected={formState.selectedSlides}/>

     
        </div>
    )
}

export default CreateSlideShow;