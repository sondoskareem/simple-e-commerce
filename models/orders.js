
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
	description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'Section',
		required: true
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'Country',
		required: true
  },
  accepted_by_user: {
    type: Boolean,
    required: true
  },
  accepted_by_center: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  paidAt: {
    type: String,
    required: true
  },
  arrivalAt: {
    type: String,
    required: true
  },
  user_player_id: {
    type: String,
    required: true
  },
 center_player_id: {
    type: String,
    required: true
  },
  isActive:{
    type: Boolean,
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
module.exports = mongoose.model("Order", OrderSchema);
