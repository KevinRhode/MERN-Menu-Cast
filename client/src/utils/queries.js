import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
   
      _id
    lastName
    firstName
    email  
        }
      }
`;

export const GET_SLIDE = gql`
{
  getSlide {
    _id
    filename
    extname
  }
}
`;

export const GET_ALL_SLIDES = gql`
{
  getAllslides {
    _id
    filename
    extname
  }
}
`;

export const GET_ALL_SLIDESHOWS = gql`
{
  getAllslideshow {
    _id
    comments
    slideshowName
    slides {
      extname
      filename
      _id
    }
  }
}
`;
export const GET_ALL_ENDPOINTS = gql`
{
  getAllEndpoints {
    _id
    deviceId
    slideshows {
      _id
      comments
      slideshowName
      slides {
        _id
        extname
        filename
      }
    }
  }
}
`;

export const GET_SLIDESHOW = gql`

query getSlideshow($getSlideshowId: String!){
  getSlideshow(id: $getSlideshowId) {
    comments
    slideshowName
    slides {
      extname
      filename
      _id
    }
    _id
  }
}
`;

export const GET_ENDPOINT = gql`
query getEndpoint($getEndpointId: String!) {
  getEndpoint(id: $getEndpointId) {
    deviceId
    _id
    slideshows {
      _id
      comments
      slides {
        extname
        filename
        _id
      }
      slideshowName
    }
  }
}
`;

export const GET_ENDPOINT_BY_ID = gql`
query getEndpointById($getEndpointId: String!) {
  getEndpointById(id: $getEndpointId) {
    deviceId
    _id
    slideshows {
      _id
      comments
      slides {
        extname
        filename
        _id
      }
      slideshowName
    }
  }
}
`;

