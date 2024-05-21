import React, {useState, useEffect, useRef} from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ENDPOINTS, GET_ENDPOINT } from '../../utils/queries';
import { useParams } from 'react-router-dom';
// import './reset.css'
import './endpoint.css'


const Endpoint = () => {
  const {id} = useParams();
  const { loading:loadingEndpoints, error: errEndpoints, data: dataEndpoints } = useQuery(GET_ALL_ENDPOINTS);
  const { loading, error, data } = useQuery(GET_ENDPOINT,{variables:{getEndpointId:id},pollInterval: 60000,fetchPolicy:'cache-and-network', errorPolicy:'all'});
  const delay = 10000;

  useEffect(() => {
    // Add the class to the html element when the component mounts
    document.documentElement.classList.add('no-overflow-y');

    // Remove the class from the html element when the component unmounts
    return () => {
      document.documentElement.classList.remove('no-overflow-y');
    };
  }, []);
  
  const [show, setShow] = useState([]);
  // if (!loading) {
    // data.getEndpoint.slideshows.forEach(slideshow => {
    //   slideshow.slides.forEach(slide => {
    //     show.push(slide)
    //   })
    // });
   
  // }
 
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