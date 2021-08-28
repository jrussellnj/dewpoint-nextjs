// import styles from './CurrentlyBlock.module.scss'

export default function CurrentlyBlock({
  getDiscomfortLevel,
  getValueByUnits,
  heading,
  units,
  weather
}) {

  const discomfortLevel = getDiscomfortLevel(weather.dew_point, units)

  const blockBody = (weather === undefined ? null :
    <div className={'p-3 inner-wrapper col-12 col-md-6 ' + discomfortLevel.dpClass}>

      <div className="currently-data">
        <p className="heading">{heading}</p>

        <div>
          <div className="weather-icon"><img className="small-icon" src="/image/sun-cloud.svg" alt="Sun behind cloud" /></div>
          <div className="weather-desc">{weather.weather[0].description}</div>
        </div>

        <div>
          <div className="weather-icon"><img className="small-icon" src="/image/thermometer.svg" alt="Thermometer" /></div>
          <div className="weather-desc">Temperature: { typeof weather.temp === "number" ? Math.round(weather.temp) : Math.round(weather.temp.day)}&deg;</div>
        </div>

        <div>
          <div className="weather-icon"><img className="small-icon" src="/image/humidity.svg" alt="Humidity scale" /></div>
          <div className="weather-desc">Humidity: {weather.humidity}%</div>
        </div>

        <div className="dewpoint">
          <div><img className="dewdrop-icon" src="/image/drop-silhouette.svg" alt="Dew drop" /> {getValueByUnits(weather.dew_point, units)}&deg;</div>
          <div className="discomfort-text">{discomfortLevel.text}</div>
        </div>
      </div>
    </div>
  );

  return blockBody
}
