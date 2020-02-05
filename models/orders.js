
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	order: {
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
  accepted: {
    type: Boolean,
    required: true
  },
  price: {
    type: String,
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
module.exports = mongoose.model("user", UserSchema);
