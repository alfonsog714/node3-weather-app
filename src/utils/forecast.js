const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/970c89af3c1efd6e0d7c0fc9d3b885fb/${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(`Unable to connect to the forecast services!`, undefined);
    } else if (response.body.error) {
      callback(`${response.body.code} - ${response.body.error}`, undefined);
    } else {
      callback(undefined, {
        temperature: response.body.currently.temperature,
        summary: response.body.currently.summary,
        humidity: response.body.currently.humidity,
        rainChance: response.body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;

// const url =
//   "https://api.darksky.net/forecast/970c89af3c1efd6e0d7c0fc9d3b885fb/37.8267,-122.4233";

// request({ url: url, json: true }, (error, response) => {
//   console.log(response.body.currently);
//   if (error) {
//     console.log(`Unable to connect to weather service!`);
//   } else if (response.body.error) {
//     console.log(`${response.body.code}, ${response.body.error}`);
//   } else {
//     console.log(
//       `${response.body.daily.data[0].summary} It is currently ${
//         response.body.currently.temperature
//       } degrees out. There is a ${
//         response.body.currently.precipProbability
//       }% chance of rain.`
//     );
//   }
// });
