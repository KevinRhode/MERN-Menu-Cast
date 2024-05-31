import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ENDPOINTS, GET_ALL_SLIDES, GET_ALL_SLIDESHOWS } from './queries';
import { useStateContext } from './GlobalState';

const DataLoader = ({ children }) => {
    const { loading:loadingSlides, error: errSlides, data: dataSlides } = useQuery(GET_ALL_SLIDES);
    const { loading:loadingSlideShows, error: errSlideShows, data: dataSlideShows } = useQuery(GET_ALL_SLIDESHOWS);
    const { loading:loadingEndpoints, error: errEndpoints, data: dataEndpoints } = useQuery(GET_ALL_ENDPOINTS);
    const { dispatch } = useStateContext();

    useEffect(() => {
        if (dataSlides && !loadingSlides && !errSlides) {
            dispatch({ type: 'SET_SLIDES', payload: dataSlides.getAllslides });
        }
    }, [dataSlides, loadingSlides, errSlides, dispatch]);

    useEffect(() => {
        if (dataSlideShows && !loadingSlideShows && !errSlideShows) {
            dispatch({ type: 'SET_SLIDESHOWS', payload: dataSlideShows.getAllslideshow });
        }
    }, [dataSlideShows, loadingSlideShows, errSlideShows, dispatch]);


    useEffect(() => {
        if (dataEndpoints && !loadingEndpoints && !errEndpoints) {
            dispatch({ type: 'SET_ENDPOINT', payload: dataEndpoints.getAllEndpoints });
        }
    }, [dataEndpoints, loadingEndpoints, errEndpoints, dispatch]);


    if (loadingSlides || loadingSlideShows) return <p>Loading...</p>;
    if (errSlides) return <p>Error! {errSlides.message}</p>
    if (errSlideShows) return <p>Error! {errSlideShows.message}</p>;

    return <>{children}</>;
};

export default DataLoader;