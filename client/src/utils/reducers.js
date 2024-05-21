
import { ADD_SLIDE,REMOVE_SLIDE, SET_SLIDES, ADD_SLIDESHOW, REMOVE_SLIDESHOW, SET_SLIDESHOWS, ADD_SELECTEDSLIDE, REMOVE_SELECTEDSLIDE, SET_SELECTEDSLIDE, SET_SLIDESHOWNAME } from "./actions";


export const reducer = (state, action) => {
    switch (action.type) {
        case SET_SLIDESHOWNAME:
          return {...state, slideshowName:action.payload}
        case ADD_SLIDE:
          return {...state, Slides:[...state.Slides, action.payload]};
        case REMOVE_SLIDE:
          return {...state, Slides:state.Slides.filter(slide => slide._id !== action.payload)};
        case SET_SLIDES:
            return {...state, Slides: action.payload};
        case ADD_SLIDESHOW:
          return {...state, SlideShow:[...state.SlideShow, action.payload]};
        case REMOVE_SLIDESHOW:
          return {...state, SlideShow:state.SlideShow.filter(slideShow => slideShow._id !== action.payload)};
        case SET_SLIDESHOWS:
            return {...state, SlideShow: action.payload};
        case ADD_SELECTEDSLIDE:
          return {...state, SelectedSlides:[...state.SelectedSlides, action.payload]};
        case REMOVE_SELECTEDSLIDE:
          return {...state, SelectedSlides:state.SelectedSlides.filter(SelectedSlides => SelectedSlides !== action.payload)};
        case SET_SELECTEDSLIDE:
            return {...state, SelectedSlides: action.payload};
        default:
          return state;
}};

