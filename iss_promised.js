// ISS PROMISED:

const request = require('request-promise-native');

//------------------------------------------------------------------
const fetchMyIP = function() {
 
return request('https://api.ipify.org?format=json');
};

//------------------------------------------------------------------
const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;

return request(`https://freegeoip.app/json/${ip}`);
};

//------------------------------------------------------------------
const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);

 return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};
//------------------------------------------------------------------
const printPassTimes = function(passTimes) {

  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
//------------------------------------------------------------------



const nextISSTimesForMyLocation = () => {
return fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then(flydata => JSON.parse(flydata).response)
};



module.exports = { nextISSTimesForMyLocation, printPassTimes };



