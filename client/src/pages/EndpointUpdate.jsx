import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../utils/GlobalState";
import { UPDATE_ENDPOINT } from "../utils/mutations";

import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ENDPOINT_BY_ID, GET_ALL_SLIDESHOWS } from '../utils/queries';

const EditEndpoint = () => {
  const { endpointId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStateContext();
  const [formState, setFormState] = useState({ deviceId: '', errorMessage: '' });
  //const {loading: slideshowloading, error: slideshowError, data: slideshowData} = useQuery(GET_ALL_SLIDESHOWS);
  const { loading, error, data } = useQuery(GET_ENDPOINT_BY_ID, { variables: { getEndpointId: endpointId } });
  const [updateEndpoint] = useMutation(UPDATE_ENDPOINT);



  useEffect(() => {
    if (data && data.getEndpointById) {
      setFormState({ deviceId: data.getEndpointById.deviceId });
      const slideshowsofEndpoint = data.getEndpointById.slideshows.map(slideshow=>slideshow._id);
      dispatch({type:'SET_SELECTEDSLIDESHOW', payload:slideshowsofEndpoint})
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      dispatch({type:'SET_SELECTEDSLIDESHOW', payload:[]})
    };
  },[]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
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

  const handleSave = async () => {
    try {
      await updateEndpoint({
        variables: { endpointId, deviceId: formState.deviceId,slideshows:state.SelectedSlideshows },
      });
      dispatch({ type: 'UPDATE_ENDPOINT', payload: { endpointId, deviceId: formState.deviceId, slideshows:state.SelectedSlideshows } });
      
      navigate(-1);
    } catch (error) {
      setFormState({ ...formState, errorMessage: error.message });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;
  //if (slideshowloading) return <p>Loading...</p>;
  if (error) return <p>Error loading endpoint</p>;
  //if (slideshowError) return <p>Error loading slideshows</p>;

  return (
    <div className="edit-endpoint">
      <h1>Edit Endpoint</h1>
      <label htmlFor="deviceId">Device ID:</label>
      <input
        type="text"
        id="deviceId"
        name="deviceId"
        value={formState.deviceId}
        onChange={handleChange}
      />
      {formState.errorMessage && <p className="error">{formState.errorMessage}</p>}
      <button className="button is-primary" onClick={handleSave}>Save Changes</button>
      <button className="button" onClick={handleCancel}>Cancel</button>
      <div className="container">
      {state.SlideShow.length === 0 ? 
      (<p>No Slideshows Available</p>) 
      :
      (state.SlideShow.map((slideshow)=>(
        <div onClick={()=>handleCardClick(slideshow._id)} key={slideshow._id} className={`slideshows ${state.SelectedSlideshows.includes(slideshow._id) ? 'selected' : ''}`}>
          <p>{slideshow.slideshowName}</p>
          <p>{slideshow.comment}</p>
        </div>
      )))}
      </div>
    </div>
  );
};

export default EditEndpoint;
