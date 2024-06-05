import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { ADD_SLIDE } from '../../utils/mutations';
import { GET_ALL_SLIDES } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { useStateContext } from '../../utils/GlobalState';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const FileUpload = () => {
    
    const { state, dispatch } = useStateContext();
    const [addSlide, {error}] = useMutation(ADD_SLIDE,{refetchQueries: [{query:GET_ALL_SLIDES}]});
    const [previewSrc, setPreviewSrc] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
          setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewSrc('');
            alert('Please select an image file (jpeg or png).');
        }
    };
    

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const response = await axios.post('/uploads', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          const {0:filename,1:extname} = response.data.file.split('\\')[2].split('.');
        
          
          const gqlResponse = await addSlide({variables:{filename,extname}});
          dispatch({type: 'ADD_SLIDE',payload:gqlResponse.data.addSlide});
          
          //(gqlResponse.data.addSlide); add to global state
    
          setMessage(response.data.message);
        } catch (error) {
          setMessage(error.response.data.error + error);
        }
      };

    return (
    <>
      <form className='buttons' onSubmit={onSubmit}>
        <input className="input" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        {previewSrc && <img src={previewSrc} alt="Preview of selected Image" style={{ width: '100%', height: 'auto' }} />}   
        <button className='button is-primary' type="submit">Upload</button>
        {message && <p>{message}</p>}
      </form>
    </>);


};

export default FileUpload;