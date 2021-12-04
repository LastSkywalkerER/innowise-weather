/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import Skyact from '../Skyact';
import DataString from '../components/DataString';
import Settings from '../components/Settings';
import {
  settings,
} from '../config';
import MainWeather from '../helpers/MainWeather';
import store from '../Skyax/store';
import {
  LOCATION_WEATHER_LOADING,
  CHANGE_SETTINGS,
  SET_LOCATION,
} from '../Skyax/constants';
import mainInconsParser from '../helpers/mainInconsParser';
// Skyact.createElement('', null, [])

import geo from '../../static/weather-img/icons/geo.svg';

import '../../styles/menu.sass';

export default class Menu extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.weather = new MainWeather();
    this.state = {
      [LOCATION_WEATHER_LOADING]: true,
    };
  }

  componentDidMount() {
    this.subscribtion = (state, type) => {
      if (this.state[LOCATION_WEATHER_LOADING] !== state[LOCATION_WEATHER_LOADING] &&
        state[LOCATION_WEATHER_LOADING] === false) {
        this.setState({
          [LOCATION_WEATHER_LOADING]: state[LOCATION_WEATHER_LOADING],
        });
      }
      if (type === CHANGE_SETTINGS || type === SET_LOCATION) {
        this.weather.getWeatherByLocation();
        this.setState({
          [LOCATION_WEATHER_LOADING]: true,
        });
      }
    };

    store.subscribe(this.subscribtion);

    this.weather.getWeatherByLocation();
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscribtion);
  }

  render() {
    // eslint-disable-next-line prefer-destructuring
    let location = store.getState().location;
    let condition = 'maybe';
    let temperature = '0';
    let humidity = '0';
    let pressure = '0';
    let wind = '0';
    if (!this.state[LOCATION_WEATHER_LOADING]) {
      location = this.weather.locationWeather.location;
      condition = this.weather.locationWeather.condition;
      temperature = this.weather.locationWeather.temp;
      humidity = this.weather.locationWeather.humidity;
      pressure = this.weather.locationWeather.pressure;
      wind = this.weather.locationWeather.wind;
    }

    return Skyact.createElement('div', {
      className: 'menu',
    }, Skyact.createElement('div', {
      className: 'container',
    }, [
      Skyact.createElement('div', {
        className: 'location-title',
      }, [
        Skyact.createElement('img', {
          src: geo,
        }, []),
        Skyact.createElement('h5', null, ['Your Location Now']),
      ]),
      Skyact.createElement('h4', null, location),
      Skyact.createElement('div', {
        className: 'weather-image',
      }, [
        Skyact.createElement(mainInconsParser(condition), null),
      ]),
      Skyact.createElement('span', {
        className: 'weather-phenomenon',
      }, condition),
      Skyact.createElement('h3', {
        className: 'temperature',
      }, temperature),
      Skyact.createElement(DataString, {
        currentHumidity: humidity,
        currentPressure: pressure,
        currentWind: wind,
      }),
      Skyact.createElement('div', {
        className: 'settings',
      }, settings.map((setting) => Skyact.createElement(Settings, setting))),
    ]));
  }
}