
const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema({
 description: {
  unique : true,
    type: String,
    required: true
  },
  isActive:{
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  count: {
    type: Number,
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
module.exports = mongoose.model("Section", SectionSchema);
