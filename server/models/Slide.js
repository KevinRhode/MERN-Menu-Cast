const mongoose = require('mongoose');

const { Schema } = mongoose;


const SlideSchema = new Schema({
  
  filename: {
    type: String,
    required: true,
  },
  extname: {
    type: String,
    required: true,
  },

});

SlideSchema.pre("find", async function (next) {
   this.extname = `.${this.extname}`  
    next();
  });

const Slide = mongoose.model('Slide', SlideSchema);

module.exports = Slide;
