import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../utils/GlobalState";
import { UPDATE_ENDPOINT } from "../utils/mutations";

import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ENDPOINT } from '../utils/queries';

const EditEndpoint = () => {
  const { endpointId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStateContext();
  const [formState, setFormState] = useState({ deviceId: '', errorMessage: '' });
  const { loading, error, data } = useQuery(GET_ENDPOINT, { variables: { getEndpointId: endpointId } });
  const [updateEndpoint] = useMutation(UPDATE_ENDPOINT);

  useEffect(() => {
    if (data && data.getEndpoint) {
      setFormState({ deviceId: data.getEndpoint.deviceId });
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateEndpoint({
        variables: { endpointId, deviceId: formState.deviceId },
      });
      dispatch({ type: 'UPDATE_ENDPOINT', payload: { endpointId, deviceId: formState.deviceId } });
      navigate('/');
    } catch (error) {
      setFormState({ ...formState, errorMessage: error.message });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading endpoint</p>;

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
    </div>
  );
};

export default EditEndpoint;
