const typeDefs = `

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Slide {
    _id: ID
    filename: String!
    extname: String!
  }

  type Slideshow {
    _id: ID
    slides: [Slide]    
    comments: String
    slideshowName: String
  }

  type Endpoint {
    _id: ID
    slideshows: [Slideshow]
    deviceId: String!
  }

  type Auth {
    token: ID
    user: User
  } 

  type Query {    
    user: User
    getEndpoint(id: String!): Endpoint
    getEndpointById(id: String!): Endpoint
    getSlide(id: String!): Slide
    getAllslides: [Slide]
    getAllslideshow: [Slideshow]  
    getSlideshow(id: String!): Slideshow
    getAllEndpoints: [Endpoint]
  }

  type Mutation {
    addEndpoint(slideshows: [ID]!, deviceId: String!): Endpoint
    updateEndpoint(_id: ID, deviceId: String!, slideshows: [ID]): Endpoint
    deleteEndpoint(endpointId: ID!): Endpoint
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth  
    addSlide(filename: String!, extname: String!): Slide  
    addSlideshow(slides: [ID]!, comments: String,slideshowName: String!): Slideshow
    updateUser(firstName: String, lastName: String, email: String, password: String): User    
    updateSlide(_id: ID,filename: String, extname: String): Slide
    deleteSlide(slideId: ID!): Slide
    updateSlideshow(_id: ID,slides: [ID], comments: String,slideshowName: String): Slideshow
    deleteSlideshow(slideshowId: ID!): Slideshow
    login(email: String!, password: String!): Auth
  }
`;
module.exports = typeDefs;
