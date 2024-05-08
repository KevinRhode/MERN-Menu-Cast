const mongoose = require('mongoose');

const { Schema } = mongoose;


const slideshowSchema = new Schema({
  slides: {
    type: [Schema.Types.ObjectId],
    ref: "Slide",
  },
  comments: {
    type: String,
    required: false,
  },
  slideshowName:{
    type: String,
    required: true,
  }

});

const Slideshow = mongoose.model('Slideshow', slideshowSchema);

module.exports = Slideshow;
