const bodyParser = require('body-parser');
const express = require('express')
const next = require('next')
const request = require('request');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  // Endpoint for retriving stop times for a given station
  server.get('/api/get-weather-data', async (req, res) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=51.507351&lon=-0.127758&appid=aa04cb60b066de29489bc3a47c800fbe&exclude=hourly,minutely&units=imperial'

    let weather

    await request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        weather = JSON.parse(body)
        console.log(weather)
      }
      else {
        console.log(response)
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(weather))
    })
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
