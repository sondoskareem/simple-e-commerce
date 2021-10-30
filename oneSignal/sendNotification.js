var request = require('request');
const OneSignal = require('onesignal-node');    

// require('dotenv').config();
// rest api key = process.env.api-key ..
// appId = process.env.appId
const apiKey = process.env.apiKey
const appId = process.env.appId

var sendNotification = function(data) {

  const client = new OneSignal.Client(appId, apiKey);
  client.createNotification(data)
  .then(response => {
    console.log(response)
  })
  .catch(e => {
    console.log(e)
  });
}
module.exports =sendNotification;

