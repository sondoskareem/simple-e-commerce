 

const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: {
    unique : true,
    type: String,
    required: [true, 'code Is Required'],
  },
  user_id: {
    type: String,
    required: [true, 'user_id Is Required'],
  },
  exp: {
    type: String,
    required: [true, 'exp Is Required'],
  },
});

module.exports = mongoose.model('Email', emailSchema);