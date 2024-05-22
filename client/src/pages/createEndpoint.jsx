import React, { useState, useRef } from 'react';
import { useStateContext } from '../utils/GlobalState';
import { useMutation } from '@apollo/client';
import { ADD_ENDPOINT } from '../utils/mutations';
import './createEndpoint.css'

function CreateEndpoint(){

  const { state, dispatch } = useStateContext();
  const [formState, setFormState] = useState({errorMessage:''});
  const [addEndpoint, {error}] = useMutation(ADD_ENDPOINT);

  const handleChange = (event) => {    
    const { value } = event.target;
    dispatch({type:'SET_ENDPOINTNAME', payload:value})
    
  };

  const handleCardClick = (slideshowId) => {  
      
    const index = state.SelectedSlideshows.indexOf(slideshowId)

    if (index !== -1) {
      // if the string is found, remove it
      dispatch({ type: 'REMOVE_SELECTEDSLIDESHOW', payload: slideshowId });
      

    } else {
      // else the string is added to the list
      dispatch({ type: 'ADD_SELECTEDSLIDESHOW', payload: slideshowId });
      
    }
  
  };
  const handleCreateEndpoint = async () => {

    if (!state.endpointName) {
      setFormState({ ...formState, errorMessage: 'Endpoint name is required' });
      return;
    }
    if (state.SelectedSlideshows.length === 0) {
      setFormState({ ...formState, errorMessage: 'At least one slideshow must be selected' });
      return;
    }

    try {
       //take the state of selectedSlides and create a new slideshow
    const createEndpoint = await addEndpoint({variables:{slideshows:[...state.SelectedSlideshows],deviceId: state.slideshowName.toLowerCase() }})
    dispatch({type: 'ADD_ENDPOINT', payload: createEndpoint.data.addSlideshow});
    dispatch({type: 'SET_SELECTEDSLIDESHOW', payload: ''})
    setFormState({errorMessage:''});

    //
    } catch (error) {
      setFormState({errorMessage:error.message});
    }
   
  }

    return (
        <div className="">
          <h2 className="title">Create Endpoint</h2>
          <div className='container'>
            {state.SlideShow.length === 0 ? 
            (<p>No Slideshows available</p>)
            :
            (state.SlideShow.map((slideshow)=>(
            <div onClick={()=>handleCardClick(slideshow._id)} key={slideshow._id} className={`slideshows ${state.SelectedSlideshows.includes(slideshow._id) ? 'selected' : ''}`}>
              <p>{slideshow.slideshowName}</p>
              <p>{slideshow.comment}</p>
            </div>
            )))}
          </div>
          <div className='container'>
          <label className='label' htmlFor="endpointID">Endpoint Name: </label>
     <input
          className='input'
          placeholder=""
          name="endpointID"
          type="text"
          id="endpointID"
          onChange={handleChange}          
        />
      {formState.errorMessage && <p>{formState.errorMessage}</p>}
       <button className='button is-primary' onClick={handleCreateEndpoint} >Create Endpoint</button>
</div>
      {/* <Slideshow onCardClick={handleCardClick}/> */}

     
        </div>
    )
}

export default CreateEndpoint;