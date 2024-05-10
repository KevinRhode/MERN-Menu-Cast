import { ADD_SLIDE,REMOVE_SLIDE, SET_SLIDES } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_SLIDE:
          return {...state, count: state.count + 1};
        case REMOVE_SLIDE:
          return {...state, count: state.count - 1 };
        case SET_SLIDES:
            return {...state, Slides: action.payload};
        default:
          return state;
}};

