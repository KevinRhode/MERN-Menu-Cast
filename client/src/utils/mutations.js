import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_SLIDE = gql`
  mutation addSlide($filename: String!, $extname: String!) {
    addSlide(filename: $filename, extname: $extname) {
      _id
      filename
      extname
    }
  }
`;

export const UPDATE_SLIDE = gql`
  mutation UpdateSlide(
    $slideId: ID,
    $filename: String!, 
    $extname: String!
    ) {

    updateSlide(
      _id: $slideId,
      filename: $filename, 
      extname: $extname)
    {        
      _id
      filename
      extname
    }
  }
`;

export const UPDATE_SLIDESHOW = gql`
mutation updateSlideshow($slideshowId: ID, $slides: [ID]!, $comments: String,$slideshowName: String!) {
  updateSlideshow(_id: $slideshowId, slides: $slides, comments: $comments, slideshowName: $slideshowName) {
    comments
    slideshowName
    _id
    slides {
      _id
    }
  }
}
`;


export const ADD_SLIDESHOW = gql`
mutation addSlideshow($slides: [ID]!, $comments: String,$slideshowName: String!) {
  addSlideshow(slides: $slides, comments: $comments, slideshowName: $slideshowName) {
    comments
    slideshowName
    _id
    slides {
      _id
    }
  }
}
`

export const ADD_ENDPOINT = gql`
mutation addEndpoint($slideshows: [ID]!, $deviceId: String!) {
  addEndpoint(slideshows: $slideshows, deviceId: $deviceId) {
    deviceId
    _id
    slideshows {
      _id
      slides {
        _id
        filename
        extname
      }
    }
  }
}
`;

export const UPDATE_ENDPOINT = gql`
mutation updateEndpoint($endpointId: ID, $slideshows: [ID]!, $deviceId: String!) {
  updateEndpoint(_id:$endpointId, slideshows: $slideshows, deviceId: $deviceId) {
    deviceId
    _id
    slideshows {
      _id
    }
  }
}
`;

export const DELETE_SLIDE = gql`
mutation DeleteSlide($slideId: ID!) {
  deleteSlide(slideId: $slideId){
    _id
    filename
    extname
  }
}`;

export const DELETE_SLIDESHOW = gql`
mutation deleteSlideshow($slideshowId: ID!) {
  deleteSlideshow(slideshowId: $slideshowId) {
    comments
    slideshowName
    _id
    slides {
      _id
    }
  }
}
`;

export const DELETE_ENDPOINT = gql`
mutation deleteEndpoint($endpointId: ID!) {
  deleteEndpoint(endpointId: $endpointId) {
    deviceId
    _id
    slideshows {
      _id
      slides {
        _id
        filename
        extname
      }
    }
  }
}
`;