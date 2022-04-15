// INDEX:

const { nextISSTimesForMyLocation, printPassTimes } = require('./iss_promised.js');

//------------------------------------------------------------------
nextISSTimesForMyLocation()

.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});

//------------------------------------------------------------------