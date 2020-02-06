var request = require('request');
function sendNotification(Ndata) {

  request({
    headers: {
       'Content-Type':"application/json",
      'Authorization': 'Basic dj'
    },
    uri: 'https://onesignal.com/api/v1/notifications',
    body: JSON.stringify(Ndata),
    method: 'POST'
  }, function (err, res, body) {
  console.log(body)
  });
}
// var message = {
//   "app_id": "b2906f69-68fd-4c88-9de8-5ae4291fc3be",
//   "contents": { "en": " Your request has been accepted" },
//   // "data": { "data1": result2[0]._id},
//   "include_player_ids": [result[0].employee_player_id],
// }
// sendNotification(message);
module.exports =sendNotification;

