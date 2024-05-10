
import { ADD_SLIDE,REMOVE_SLIDE, SET_SLIDES } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_SLIDE:
          return {...state, Slides:[...state.Slides, action.payload]};
        case REMOVE_SLIDE:
          return {...state, Slides:state.Slides.filter(slide => slide._id !== action.payload)};
        case SET_SLIDES:
            return {...state, Slides: action.payload};
        default:
          return state;
}};

