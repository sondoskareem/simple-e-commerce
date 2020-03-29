var request = require('request');
const OneSignal = require('onesignal-node');    

// require('dotenv').config();
// rest api key = process.env.api-key ..
// appId = process.env.appId
const apiKey = 'NTA5NDlkMDItYjQyMS00ODdjLWFlNzMtYWMzNDI1Nzg1OGUz'
const appId = 'f0825492-58b0-478a-881c-51ee436d756b'
var sendNotification = function(data) {

  const client = new OneSignal.Client(appId, apiKey);
// console.log('hellllllllllo')
// console.log(client)
  client.createNotification(data)
  .then(response => {
    // console.log(response)
  })
  .catch(e => {
    // console.log(e)
  });
}
module.exports =sendNotification;

