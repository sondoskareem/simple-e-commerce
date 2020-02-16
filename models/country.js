
const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
  name: {
    unique : true,
    type: String,
    required: true
  },
  flag: {
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
module.exports = mongoose.model('Country', CountrySchema);
