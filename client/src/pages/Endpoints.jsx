import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useStateContext } from '../utils/GlobalState';
import './style.css';

function Endpoints(){
    const { state, dispatch } = useStateContext();
  
    return (
        <div className="endpoint-container">
          {state.Endpoints.length === 0 ? (
            <p>No Endpoints</p>
          ) : (
            state.Endpoints.map((endpoint) => (
              <div key={endpoint._id} className="endpoint-card">
                <h3>Endpoint: {endpoint.name}</h3>
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
              </div>
            ))
          )}
        </div>
      );

    // return (
    //     <div className='container'>
    //         {state.Endpoints.length === 0 ? (<p>No Endpoints</p>) 
    //         :
    //         (state.Endpoints.map((endpoint)=>(
    //             <div key={endpoint._id}>
    //                 {endpoint.slideshows.map((slideshow)=>(
    //                     <div key={slideshow._id}>
    //                     <p>{slideshow.slideshowName}</p>
    //                     <p>{slideshow.comment}</p>
    //                     {slideshow.slides.map((slide)=>(
    //                         <div>
    //                             <img src={`/uploads/${slide.filename}.${slide.extname}`} alt={slide.filename} />
    //                         </div>
    //                     ))}
    //                     </div>
                       
    //                 ))}
    //             </div>
    //         )))}
    //     </div>
        //)
             }

export default Endpoints;