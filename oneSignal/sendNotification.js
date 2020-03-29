var request = require('request');
const OneSignal = require('onesignal-node');    

// require('dotenv').config();
// rest api key = process.env.api-key ..
// appId = process.env.appId
const apiKey = 'NTA5NDlkMDItYjQyMS00ODdjLWFlNzMtYWMzNDI1Nzg1OGUz'
const appId = 'f0825492-58b0-478a-881c-51ee436d756b'
function sendNotification(Ndata) {
  console.log('00 ')
  request({
    headers: {
       'Content-Type':"application/json",
      'Authorization': 'Basic NTA5NDlkMDItYjQyMS00ODdjLWFlNzMtYWMzNDI1Nzg1OGUz'
    },
    uri: 'https://onesignal.com/api/v1/notifications',
    body: JSON.stringify(Ndata),
    method: 'POST'
  }, function (err, res, body) {
    if (err)console.log(err)
  console.log(body)
  });
//   const client = new OneSignal.Client(appId, apiKey);
// console.log('hellllllllllo')
// console.log(client)
//   client.createNotification(Ndata)
//   .then(response => {
//     console.log(response)
//   })
//   .catch(e => {
//     console.log(e)
//   });
}
module.exports =sendNotification;

