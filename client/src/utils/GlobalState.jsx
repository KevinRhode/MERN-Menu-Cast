
import React, { createContext, useReducer, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { reducer } from './reducers';


// Initial state
const initialState = {
    Slides:[],
    SlideShow:[],
    SelectedSlides:[]
};

// Create context
const StateContext = createContext(initialState);

// Provider component
export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);