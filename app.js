var express = require('express')
  app = express()
  mongoose = require('mongoose')
  require('dotenv').config();
  port = process.env.PORT || 8000
  // port = 8000

  const InitiateMongoServer = require("./config/db")

  bodyParser = require('body-parser');
  var upload = require('express-fileupload');
  var cors = require('cors');




  app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 50000
  }))
  // var backup = require('mongodb-backup');

  // parse application/json
  app.use(bodyParser.json({ limit: '100mb' }))
  
  // mongoose.Promise = global.Promise;
  
app.use(upload());
app.use(cors({
  credentials: true,
})); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/appRoute');
routes('/api/v1',app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


  //db
  InitiateMongoServer();


app.listen(port);

console.log('server started on: ' + port);
