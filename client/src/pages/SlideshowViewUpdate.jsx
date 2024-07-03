import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_SLIDESHOW, DELETE_SLIDESHOW } from '../utils/mutations';
import { GET_SLIDESHOW } from '../utils/queries';
import Slides from './Slides';


const SlideshowViewUpdate = () => {
  const { slideshowId } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ errorMessage: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedSlides, setSelectedSlides] = useState([]);
  const { loading, error, data } = useQuery(GET_SLIDESHOW, { variables: { getSlideshowId:slideshowId } });
  const [updateSlideshow] = useMutation(UPDATE_SLIDESHOW);
  const [deleteSlideshow] = useMutation(DELETE_SLIDESHOW);

  useEffect(() => {
    if (data && data.slideshow) {
      setSelectedSlides(data.slideshow.slides);
    }
  }, [data]);

  const handleChange = (event) => {
    const { value } = event.target;
    setFormState({ ...formState, slideshowName: value });
  };

  const handleCardClick = (slideId) => {
    const index = selectedSlides.indexOf(slideId);
    if (index !== -1) {
      setSelectedSlides(selectedSlides.filter(id => id !== slideId));
    } else {
      setSelectedSlides([...selectedSlides, slideId]);
    }
  };

  const handleSave = async () => {
    try {
      await updateSlideshow({ variables: { slideshowId, slideshowName: formState.slideshowName, slides: selectedSlides } });
      navigate('/');
    } catch (error) {
      setFormState({ errorMessage: error.message });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSlideshow({ variables: { slideshowId } });
      navigate('/');
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
        value={formState.slideshowName || getSlideshow.slideshowName}
        onChange={handleChange}
      />
      {formState.errorMessage && <p className="error">{formState.errorMessage}</p>}
      <button className="button is-primary" onClick={handleSave}>Save Changes</button>
      <button className="button is-danger" onClick={() => setShowModal(true)}>Delete Slideshow</button>
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
