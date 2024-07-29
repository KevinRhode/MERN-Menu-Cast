import React, {useState, useEffect, useRef} from 'react';
import { useQuery } from '@apollo/client';
import {  GET_ENDPOINT } from '../../utils/queries';
import { useParams } from 'react-router-dom';
//import './reset.css'
//import './endpoint.css'


const Endpoint = () => {
  const {id} = useParams();
  const { loading, error, data } = useQuery(GET_ENDPOINT,{variables:{getEndpointId:id.toLowerCase()},pollInterval: 60000,fetchPolicy:'cache-and-network', errorPolicy:'all'});
  const delay = 10000;

  useEffect(() => {
    
    

     // Create a link element
     const link = document.createElement('link');
     const resetlink = document.createElement('link');

     link.rel = 'stylesheet';
     link.href = '/src/components/endpoint/endpoint.css';
     link.id = 'dynamic-stylesheet';

     resetlink.rel = 'stylesheet';
     resetlink.href = '/src/components/endpoint/reset.css';
     resetlink.id = 'dynamic-stylesheet';
 
     // Append the link element to the head
     document.head.appendChild(resetlink);
     document.head.appendChild(link);
     // Add the class to the html element when the component mounts
     document.documentElement.classList.add('no-body-overflow-y');

    // Remove the class from the html element when the component unmounts
    return () => {
      document.documentElement.classList.remove('no-body-overflow-y');
      document.head.removeChild(link);
    };
  }, []);
  
  const [show, setShow] = useState([]); 
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (data && data.getEndpoint) {
      const slides = [];
      data.getEndpoint.slideshows.forEach(slideshow => {
        slideshow.slides.forEach(slide => {
          slides.push(slide);
        });
      });
      setShow(slides);
    }
  }, [data]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === show.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, show.length]);
  
  if (loading) return <p>Loading...</p>
  if (error && !data.getEndpoint) return <p>Error: {error.message}</p>;
  return (
    <div className='slideshow-container'>

    
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        
        {show.map((background, index) => (
          <div
            className="slide"
            key={index}           
            // style={{ backgroundImage:`url(${background})`,backgroundSize:'cover'  }}

          >
           
            <img src={`/uploads/${background.filename}.${background.extname}`} alt={background.filename}
                />
          </div>
        ))}
      </div>
    </div>
    </div> 
   
    // <> {data.getEndpoint && <>OK</>}</>
  );
};

export default Endpoint;