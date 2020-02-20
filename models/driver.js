
const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({

  id_front: {
    type: String,
    required: true
  }, 
  id_back: {
    type: String,
    required: true
  }, 
  car_type: {
    type: String,
    required: true
  }, 
  car_model: {
    type: String,
    required: true
  },  
  personal_img: {
    type: String,
    required: true
  },
  form_img: {
    type: String,
    required: true
  },
  license_img: {
    type: String,
    required: true
  },
  user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updateddAt: {
    type: String,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model('Driver', DriverSchema);
