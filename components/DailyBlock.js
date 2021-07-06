import styles from './Current.module.scss'

export default function DailyBlock( {
  day,
  getDiscomfortLevel,
  getValueByUnits,
  offset,
  units,
  weather
} ) {

  const thisDay = day
  const discomfortLevel = getDiscomfortLevel(day.dew_point, 'us')

    const blockBody = (thisDay === undefined ? null :
      <div className="col-11 col-sm-4 col-md-3 px-0 day">
        <div className={ 'd-flex align-items-center p-3 inner-wrapper ' + styles[discomfortLevel.dpClass]}>
          <div className="day-contents">

            <div className="temperature">
              <div className="date">
                {thisDay.dt}
              </div>
              <img className="dewdrop-icon" src="/image/drop-silhouette.svg" alt="Dew drop" /> {getValueByUnits(thisDay.dew_point, units)}&deg;
              <div className="discomfort-text">{discomfortLevel.text}</div>
            </div>

            <div className="summary">
              <div>{thisDay.summary} High: {Math.round(thisDay.temp.max)}&deg;. Humidity: {thisDay.humidity}%.</div>
            </div>
          </div>
        </div>
      </div>
    );

  return blockBody;
}

/* Return a formatted date based on a timestamp and UTC offset */
const offsetTime = function (timestamp, offset) {
  let
    date = new Date(),
    providedDate = new Date((timestamp * 1000) + (offset * 3600000) + (date.getTimezoneOffset() * 60000));

  return providedDate;
}
