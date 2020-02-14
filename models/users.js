
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    unique : true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  player_id: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  role: { //1 call center 0 user
    type: Number,
    required: true
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'Country',
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
module.exports = mongoose.model("User", UserSchema);
