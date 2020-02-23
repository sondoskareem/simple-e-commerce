
const mongoose = require("mongoose");

// const MONGOURI = process.env.MONGOURI;
const MONGOURI ='mongodb://m_center:123456er@ds047652.mlab.com:47652/m_center';

const InitiateMongoServer =  () => {
  try {
     mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:false
    });
    console.log("Connected to DB ");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;