// This file will contain the logic for fetching the data from each API
//--------------------------------------------------------------------------
const request = require('request');


//----------------------------------------------------------------------------
const fetchMyIp = function(callback) {

  // we use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    //if an error has happened pass error to callback func
    if (error) return callback(error, null);
  
    // if our http status code is anything other then 200, push error to the callback
    // and run this special status code string
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
  
    //var ip is now equal to a string of our ip address
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//----------------------------------------------------------------------------
const fetchCoordsByIp = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    
    // -an anonymous var is equal to the data from the coords ip request after it
    // has been parsed via JSON, it contains only the lat and long.
    // extraction > parse > pull out only lat and long
    const {latitude, longitude} = JSON.parse(body);
      
    callback(null, {latitude, longitude});
  });
};

//----------------------------------------------------------------------------
const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    
    const issresponse = JSON.parse(body).response;
      
    callback(null, issresponse);
  });
};

//----------------------------------------------------------------------------
 const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };