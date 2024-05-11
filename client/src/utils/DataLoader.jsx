import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_SLIDES } from './queries';
import { useStateContext } from './GlobalState';

const DataLoader = ({ children }) => {
    const { loading, error, data } = useQuery(GET_ALL_SLIDES,{notifyOnNetworkStatusChange:true});
    const { dispatch } = useStateContext();

    useEffect(() => {
        if (data && !loading && !error) {
            dispatch({ type: 'SET_SLIDES', payload: data.getAllslides });
        }
    }, [data, loading, error, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    return <>{children}</>;
};

export default DataLoader;