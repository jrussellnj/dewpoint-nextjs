import React from 'react'
// import './Header.module.scss'

export default class Header extends React.Component {

  // Lifecycle methods

  componentDidMount() {

    // Connect the initLookup function within this class to the global window context, so Google Maps can invoke it
    window.initLookup = this.initLookup.bind(this);

    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=' + process.env.NEXT_PUBLIC_GOOGLE_API_KEY + '&libraries=places&callback=initLookup');
  }

  render() {
    return (
      <header className="header row align-items-center">
        <div className="col-12 col-md-6">
          <h1> <img className="dewdrop" src="/image/drop.svg" alt="Dew drop" /> Dew Point Forecast </h1>
        </div>

        <div className="col-12 col-md-6">
          <div>
            <input id="location-search" type="text" placeholder="Find dew point in another location..." onClick={(e) => this.clearContents(e)} />
            <button className="locate-me" onClick={this.props.getUserLocation}><img src="/image/target.svg" alt="Locating icon" /> Use my location</button>
          </div>

          <div className="mb-2">
            <button className="switch-units" onClick={this.props.changeUnits}>Change units to <span id="opposite-units"> {this.props.units === 'imperial' ? 'Celsius' : 'Fahrenheit'} </span></button>
          </div>
        </div>
      </header>
    )
  }

  // Custom methods
  /* Used for loading external Javascript */
  loadJS(src, callback) {
    var
      ref = window.document.getElementsByTagName("script")[0],
      script = window.document.createElement("script");

    script.src = src;
    script.async = true;
    script.onload = callback;

    ref.parentNode.insertBefore(script, ref);
  }

  /* Initialize the location search bar */

  /* Initialize the location search bar */
  initLookup() {
    let
      that = this,
      input = document.getElementById('location-search'),
      autocomplete = new google.maps.places.Autocomplete(input, { fields: ['place_id', 'name', 'types'] }),
      geocoder = new google.maps.Geocoder(),
      // urlParam = this.props.match.params;
      urlParam = []

    // If the URL contains a location string, kick off a lookup based on that
    if (!!urlParam[0]) {

      // Get the latitude and longitude for the new location and then find its weather
      geocoder.geocode({ 'address': urlParam[0] }, function(results, status) {
        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }

        // Update the state's coordinates, which kicks off a new weather data request
        that.props.updateCoords({ latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() });
      });
    }
    else {
      this.props.getUserLocation();
    }

    // For when they click on the location in the address autocomplete bar
    autocomplete.addListener('place_changed', function() {
      let place = autocomplete.getPlace();

      if (place.place_id) {

        // Get the latitude and longitude for the new location and then find its weather
        geocoder.geocode({ 'placeId': place.place_id }, function(results, status) {
          if (status !== 'OK') {
            window.alert('Geocoder failed due to: ' + status);
            return;
          }

          // Update the state's coordinates, which kicks off a new weather data request
          that.props.updateCoords({ latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() });
        });
      }
    });

    // Hitting enter selects the first location in thelocations dropdown
    let _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected and then trigger the original listener.
    function addEventListenerWrapper(type, listener) {

      if (type === 'keydown') {
        var originalListener = listener;

        listener = function (event) {

          if (event.which === 13 || event.keyCode === 13) {
            let suggestionSelected = document.getElementsByClassName('pac-item.pac-item-selected').length > 0;

            if (!suggestionSelected) {
              let simulatedDownArrow = new KeyboardEvent('keydown', { 'keyCode': 40, 'which': 40 });
              originalListener.apply(input, [ simulatedDownArrow ]);
            }
          }

          originalListener.apply(input, [ event ]);
        };
      }

      // Add the modified listener
      _addEventListener.apply(input, [ type, listener ]);
    }

    if (input.addEventListener) {
      input.addEventListener = addEventListenerWrapper;
    }
    else if (input.attachEvent) {
      input.attachEvent = addEventListenerWrapper;
    }
  }

  /* Clear the contents of the clicked-in input field */
  clearContents(e) {
    e.target.value = '';
  }
}
