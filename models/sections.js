
const mongoose = require("mongoose");

const SectionSchema = mongoose.Schema({
 description: {
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
module.exports = mongoose.model("section", SectionSchema);
