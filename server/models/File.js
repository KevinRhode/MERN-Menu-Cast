const mongoose = require('mongoose');

const { Schema } = mongoose;


const fileSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  encoding: {
    type: String,
    required: true,
  },

});


const dbFile = mongoose.model('dbFile', fileSchema);

module.exports = dbFile;
