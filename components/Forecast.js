import CurrentlyBlock from './CurrentlyBlock.js';
import DailyBlock from './DailyBlock.js';

// import './Forecast.module.scss';

export default function Forecast({
  city,
  isFindingLocation,
  isLoadingWeather,
  locationFailed,
  units,
  weather,
}) {

  let currentlyData = weather == null ? null :
    <div className="col-11 col-md-12 currently day">
      <div className="row today">
        <CurrentlyBlock
          weather={weather.current}
          heading="Right Now"
          key={weather.current.dt}
          getDiscomfortLevel={getDiscomfortLevel}
          getValueByUnits={getValueByUnits}
          units={units} />

        <CurrentlyBlock
          weather={weather.daily[0]}
          heading="Today's Forecast"
          key={weather.daily[0].dt}
          getDiscomfortLevel={getDiscomfortLevel}
          getValueByUnits={getValueByUnits}
          units={units} />
      </div>
    </div>;

  console.log(weather)
  let dailyData = null

  if (weather != null) {
    dailyData =
    weather.daily.slice(1).map(day =>
      <DailyBlock
        day={day}
        key={day.dt}
        getDiscomfortLevel={getDiscomfortLevel}
        getValueByUnits={getValueByUnits}
        offset={weather.offset}
        units={units} />
    )
  }

    return (
      <div>
        <div className="row loading-icons">
          <div className="col-12 text-center">
            { !isFindingLocation ? null : <img src="/image/target.svg" id="getting-location" alt="Finding location" /> }
            { !isLoadingWeather ? null : <img src="/image/sun-cloud.svg" id="getting-weather" alt="Loading weather" /> }
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="row justify-content-center forecast-holder">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <h5 className="city-name">{city}</h5>
                  </div>
                </div>

                <div className="row justify-content-center justify-content-md-start" id="forecast-blocks">
                  {currentlyData}
                  {dailyData}
                </div>

                { !locationFailed ? null :
                  <div className="row text-center" id="denied-geolocation">
                    <div className="col-12">
                      <h3>Geolocation failed</h3>
                      <p>But that's alright! You can use the site without geolocation by entering a location above.</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Custom methods

  /* Return the point on the discomfort scale for the provided dewpoint */
  const getDiscomfortLevel = function(dewpoint, units) {
    // console.log("-- getDiscomfortLevel", dewpoint, units)

    let
      levelIsFound = false,
      thisLevel = null,
      scale = [
        {'f': 50, 'c': 10, 'text': 'Pleasant', 'class': 'dp-level-1' },
        {'f': 55, 'c': 12.8, 'text': 'Comfortable', 'class': 'dp-level-1' },
        {'f': 60, 'c': 15.6, 'text': 'Noticible', 'class': 'dp-level-2' },
        {'f': 65, 'c': 18.3, 'text': 'Sticky', 'class': 'dp-level-3' },
        {'f': 70, 'c': 21.1, 'text': 'Uncomfortable', 'class': 'dp-level-4' },
        {'f': 75, 'c': 23.9, 'text': 'Oppressive', 'class': 'dp-level-5' },
        {'f': 100, 'c': 37.8, 'text': 'Severe Discomfort', 'class': 'dp-level-6' },
      ];

    scale.forEach(function (value, i) {
      if (!levelIsFound) {
        if ((units !== null && units === 'si' && dewpoint < value['c'])
           || (((units !== null && units === 'us') || units === null) && dewpoint < value['f'])) {
          levelIsFound = true
          thisLevel = value;
        }
      }
    });

    return {
      text: thisLevel['text'],
      dpClass: thisLevel['class']
    };
  }

  /* Return a number (usually the dew point value)  with either one decimal place or zero depending on the user's selected units */
  const getValueByUnits = function(value, units) {
    return value.toFixed(units === 'si' ? '1' : '0');
  }
