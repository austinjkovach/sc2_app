var https = require('https');
var Promise = require('bluebird');

var PromiseGet = Promise.promisify(require('https').get);

var getLadderInfoP = function(ladderId){
  return PromiseGet('https://us.api.battle.net/sc2/ladder/' + ladderId + '?locale=en_US&apikey=' + process.env.BNET_KEY, function(response){
  var fullBody = '';
  response.setEncoding('utf8');

  response.on('data', (chunk) => {
    console.log('got chunk:', chunk);
    fullBody += chunk;
  })
  .on('end', () => {
    return fullBody;
  })
})
  // .then(function(result){
  //   console.log(result);
  // })
  // .catch(function(error){
  //   console.log('error:', error)
  // })
};

var getProfileInfoP = function(profileId, profileName, regionId){
  var regionId = regionId ? regionId : 1;
  return PromiseGet('https://us.api.battle.net/sc2/profile/' + profileId + '/' + regionId + '/' + profileName + '/?locale=en_US&apikey=' + process.env.BNET_KEY, function(response){

    var fullBody = '';
    response.setEncoding('utf8');

    response.on('data', (data) => {
      fullBody += data;
    })
    .on('end', (data) => {
      fullBody = JSON.parse(fullBody);
      console.log('full:', fullBody)
      return fullBody;
    });
  });
}

getProfileInfoP(3248629, 'Bazooka');

// getLadderInfoP()
// var getLadderInfo = function(ladderId){
//   https.get('https://us.api.battle.net/sc2/ladder/' + ladderId + '?locale=en_US&apikey=' + process.env.BNET_KEY, (response) =>{

//     var fullBody = '';
//     response.setEncoding('utf8');

//     response.on('data', (chunk) => {
//       fullBody += chunk;
//     })
//     .on('end', () => {
//       console.log('got:', fullBody);
//       return fullBody;
//     })
//   })
//   .on('error', function(){
//     console.log('error:', error);
//   });
// }

// getLadderInfo(18979);

/*

  - Blizzard API
  https://dev.battle.net/io-docs
  http://bluebirdjs.com/docs/api/new-promise.html
  https://nodejs.org/api/https.html#https_https_get_options_callback
  http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
  http://stackoverflow.com/questions/31098009/node-js-request-node-js-bluebird-request
  https://github.com/petkaantonov/bluebird/issues/196

    +++ Promisify request 
    - Add Profile request
    - Add Profile Ladder request

  - Postgres DB
    - Add request data to DB
    - Add from DB for info

  - Show Data
    - Load script tags
    - Browserify?

*/