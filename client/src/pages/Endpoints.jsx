import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useStateContext } from '../utils/GlobalState';
import './style.css';
import { useMutation } from '@apollo/client';
import { DELETE_ENDPOINT } from '../utils/mutations';

function Endpoints(){
    const { state, dispatch } = useStateContext();
    const navigate = useNavigate();
    const [deleteEndpoint, {loading, error}] = useMutation(DELETE_ENDPOINT)
    const [showModal, setShowModal] = useState(false);
    const [endpointId, setEndpointIdSelected] = useState('');

    const handleDeleteEndpoint = async () => {
      try {
        const gqlResponse = await deleteEndpoint({variables:{endpointId}});
        
        dispatch({ type: 'REMOVE_ENDPOINT', payload: endpointId });
        setEndpointIdSelected('');
        setShowModal(false);
        return gqlResponse.data;
      } catch (error) {
        return error;
      } 
    }
    const promptDelete = (selectedId) => {
      setEndpointIdSelected(selectedId);
      setShowModal(true);
    }
  
    return (
        <div className="endpoint-container">
          {state.Endpoints.length === 0 ? (
            <p>No Endpoints</p>
          ) : (
            state.Endpoints.map((endpoint) => (
              <div key={endpoint._id} className="endpoint-card">
                <h3>Endpoint: {endpoint.deviceId} </h3>
                {endpoint.slideshows.map((slideshow) => (
                  <div key={slideshow._id} className="slideshow-card">
                    <h4>{slideshow.slideshowName}</h4>
                    <p>{slideshow.comment}</p>
                    <div className="slides-container">
                      {slideshow.slides.map((slide) => (
                        <div key={slide._id} className="slide">
                          <img
                            src={`/uploads/${slide.filename}.${slide.extname}`}
                            alt={slide.filename}
                            className="slide-image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button className='button is-danger' onClick={()=>promptDelete(endpoint._id)}>Delete Endpoint</button>
                <button className='button is-secondary' onClick={() => navigate(`/endpoint/${endpoint._id}`)}>Edit</button>
              </div>
            ))
          )}
          <div id="modal-js-example" className={`modal ${showModal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => {setShowModal(false); setEndpointIdSelected('');}}></div>
        <div className="modal-content section">
         
          <div className="box">
          <h2 className='title'>Confirmation</h2>            
            <p className='field'>Are you sure you want to delete this slide?</p>
            <div className='buttons'>
            <button className='button is-success' onClick={() => handleDeleteEndpoint()}>Confirm Delete</button>
            <button className='button is-success' onClick={() => {setShowModal(false); setEndpointIdSelected('');}}>Cancel</button>
            </div>
            
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => {setShowModal(false); setEndpointIdSelected('');}}></button>
      </div>
        </div>
      );
             }

export default Endpoints;