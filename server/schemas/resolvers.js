const User = require('../models/User');
const Slide = require('../models/Slide');
const Slideshow = require('../models/Slideshow');
const Endpoint = require('../models/Endpoint');
const { signToken, AuthenticationError } = require('../utils/auth');



const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw AuthenticationError;
    },
    getSlide: async (parent, { id }, context) => {
      if (context.user) {
        const slide = await Slide.findById(id);
        return slide;
      }
    },
    getAllslides: async (parent, args, context) => {
      if (context.user) {
        const slides = await Slide.find();
        return slides;
      }
    },
    getAllslideshow: async (parents, args, context) => {
      if (context.user) {
        const slideshows = await Slideshow.find().populate('slides');
        return slideshows;
      }
    },
    getSlideshow: async (parents, { id }, context) => {
      if (context.user) {
        const slideshow = await Slideshow.findById(id).populate('slides');
        return slideshow;
      }
    },
    getEndpoint: async (parent, { id }) => {

      const endpoint = await Endpoint.findOne({ deviceId: id }).populate({ path: 'slideshows', populate: { path: 'slides' } });
      return endpoint;

    },
    getAllEndpoints: async (parent, args, context) => {
      if (context.user) {
      const endpoints = await Endpoint.find().populate({ path: 'slideshows', populate: { path: 'slides' } });
      return endpoints;
      }
    }


  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addSlide: async (parent, args, context) => {
      if (context.user) {
        const slide = await Slide.create(args);
        return slide;
      }
    },
    updateSlide: async (parent, { _id: id, filename, extname }, context) => {
      if (context.user) {
        const updatedSlide = await Slide.findByIdAndUpdate({ _id: id }, { id, filename, extname }, { new: true });
        return updatedSlide;
      }
    },
    deleteSlide: async (parent, { slideId }, context) => {
      if (context.user) {
        try {
          const deletedSlide = await Slide.findByIdAndDelete({ _id: slideId });
        if (!deletedSlide) {
          throw new Error("No slide found with this ID.");
        }
        return deletedSlide;
        } catch (error) {
          throw new Error("Failed to delete the slide.");
        }
        
      }
      
    },

    addSlideshow: async (parent, args, context) => {
      if (context.user) {
        const slideshow = await Slideshow.create(args);
        return slideshow;
      }
    },
    updateSlideshow: async (parent, { _id, slides, comments, slideshowName }, context) => {
      if (context.user) {
        const updatedSlideshow = await Slideshow.findByIdAndUpdate({ _id: _id }, { slides, comments, slideshowName }, { new: true });
        return updatedSlideshow;
      }
    },
    deleteSlideshow: async (parent, { slideshowId }, context) => {
      if (context.user) {
        try {
          const deletedSlideshow = await Slideshow.findByIdAndDelete({ _id: slideshowId });
        if (!deletedSlideshow) {
          throw new Error("No slideshow found with this ID.");
        }
        return deletedSlideshow;
        } catch (error) {
          throw new Error("Failed to delete the slideshow.");
        }
        
      }
      
    },

    addEndpoint: async (parent, args, context) => {
      if (context.user) {
        //creating the new endpoint
        const endpoint = await Endpoint.create(args);
        //retrieving the endpoint to supply as a response
        const endpoint2 = await Endpoint.findOne({ deviceId: args.deviceId }).populate({ path: 'slideshows', populate: { path: 'slides' } });
        
        return endpoint2;
      }
      throw AuthenticationError;
    },
    updateEndpoint: async (parent, { _id, deviceId, slideshows }, context) => {
      if (context.user) {
        const updatedEndpoint = await Endpoint.findByIdAndUpdate({ _id }, { slideshows, deviceId }, { new: true });
        return updatedEndpoint;
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
