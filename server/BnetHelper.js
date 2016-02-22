var https = require('https');
var Promise = require('bluebird');

var getLadderInfoPromise = function(url){
  return new Promise(function(resolve){

  });
}

// getProfile('string');



var getLadderInfo = function(ladderId){
  https.get('https://us.api.battle.net/sc2/ladder/' + ladderId + '?locale=en_US&apikey=' + process.env.BNET_KEY, (response) =>{

    var fullBody = '';
    response.setEncoding('utf8');

    response.on('data', (chunk) => {
      fullBody += chunk;
    })
    .on('end', () => {
      console.log('got:', fullBody);
      return fullBody;
    })
  })
  .on('error', function(){
    console.log('error:', error);
  });
}

getLadderInfo(18979);