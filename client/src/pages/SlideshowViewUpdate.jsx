import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { useStateContext } from '../utils/GlobalState';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_SLIDESHOW, DELETE_SLIDESHOW } from '../utils/mutations';
import { GET_SLIDESHOW } from '../utils/queries';
import Slides from './Slides';


const SlideshowViewUpdate = () => {
  const { slideshowId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ errorMessage: '',slideshowName:'' });
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = useStateContext();
  const { loading, error, data } = useQuery(GET_SLIDESHOW, { variables: { getSlideshowId:slideshowId } });
  const [updateSlideshow] = useMutation(UPDATE_SLIDESHOW);
  const [deleteSlideshow] = useMutation(DELETE_SLIDESHOW);

  useEffect(() => {
    if (data && data.getSlideshow) {
      const mapIds = data.getSlideshow.slides.map(slide => slide._id);
      dispatch({type:'SET_SELECTEDSLIDE', payload:mapIds});
      setFormState({...formState, slideshowName:data.getSlideshow.slideshowName})
    }
  }, [data, dispatch ]);

  useEffect(() => {
    return () => {
      dispatch({type:'SET_SELECTEDSLIDE', payload:[]})
    };
  },[]);
  const handleChange = (event) => {
    const { value } = event.target;
    setFormState({ ...formState, slideshowName: value });
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
  const updateSlideshowInEndpoints = (globalState, updatedSlideshow) => {
    return globalState.map(endpoint => {
        const updatedSlideshows = endpoint.slideshows.map(slideshow => {
            if (slideshow._id === updatedSlideshow._id) {
                return { ...slideshow, ...updatedSlideshow };
            }
            return slideshow;
        });
        return { ...endpoint, slideshows: updatedSlideshows };
    });
};

  const handleSave = async () => {
    try {
      const updatedSlideshow = await updateSlideshow({ variables: { slideshowId, slideshowName: formState.slideshowName, slides: state.SelectedSlides } });
      const newGlobalEndpoints = updateSlideshowInEndpoints(state.Endpoints, updatedSlideshow.data.updateSlideshow);
      dispatch({type:'SET_ENDPOINT',payload:newGlobalEndpoints})
      
      navigate(-1);
    } catch (error) {
      setFormState({ errorMessage: error.message });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSlideshow({ variables: { slideshowId } });
      navigate(-1);
    } catch (error) {
      setFormState({ errorMessage: error.message });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading slideshow</p>;

  const { getSlideshow } = data;

  return (
    <div className="slideshow-view-update">
      <h1>Edit Slideshow</h1>
      <label htmlFor="slideshowName">Slideshow Name:</label>
      <input
        type="text"
        id="slideshowName"
        value={getSlideshow.slideshowName || formState.slideshowName}
        onChange={handleChange}
      />
      {formState.errorMessage && <p className="error">{formState.errorMessage}</p>}
      <button className="button is-primary" onClick={handleSave}>Save Changes</button>
      <button className="button is-secondary" onClick={() => navigate(-1)}>Go Back</button>
      <Slides onCardClick={handleCardClick} />
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowModal(false)}></div>
          <div className="modal-content">
            <div className="box">
              <h2>Confirmation</h2>
              <p>Are you sure you want to delete this slideshow?</p>
              <button className="button is-danger" onClick={handleDelete}>Confirm Delete</button>
              <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setShowModal(false)}></button>
        </div>
      )}
    </div>
  );
};

export default SlideshowViewUpdate;
