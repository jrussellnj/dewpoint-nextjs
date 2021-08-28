const request = require('request')

export default async (req, res) => {
  const { latitude, longitude, units } = req.query

  const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=${units}`
  // console.log("lat, long, units, url", latitude, longitude, units, url)
  let weather

  await request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      weather = JSON.parse(body)
      // console.log(weather)
    }
    else {
      console.log(body)
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(weather))
  })
}
