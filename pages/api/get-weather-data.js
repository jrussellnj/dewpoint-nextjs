const request = require('request')

export default async (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.WEATHER_API_KEY}&lat=39.916279&lon=-75&exclude=hourly,minutely&units=imperial`
  let weather

  await request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      weather = JSON.parse(body)
      //console.log(weather)
    }
    else {
      //console.log(response)
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(weather))
  })
}
