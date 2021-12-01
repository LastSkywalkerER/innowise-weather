/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import HoursForecastData from '../components/HoursForecastData';
import DaysForecastData from '../components/DaysForecastData';
import DataString from '../components/DataString';
import store from '../Skyax/store';
import {
  WEATHER_LOADING,
  FORECAST_LOADING,
} from '../Skyax/constants';
import MainWeather from '../helpers/MainWeather';
import Loader from '../components/Loader';

import moonImage from '../../static/weather-img/moon.png';
import daylightLineImage from '../../static/weather-img/daylight-line.png';
import cloud1Image from '../../static/weather-img/cloud1.png';
import cloud2Image from '../../static/weather-img/cloud2.png';
import sunIcon from '../../static/weather-img/icons/sun.svg';
// Skyact.createElement('', null, [])

import '../../styles/main-screen.sass';

export default class MainScreen extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      weatherLoading: true,
      forecastLoading: true,
      currentWeather: new MainWeather(),
    };
  }

  componentDidMount() {
    this.state.currentWeather.getMainData();
    this.state.currentWeather.getForecast();

    this.subscribtion = (state) => {
      if (this.state[WEATHER_LOADING] !== state[WEATHER_LOADING] &&
        state[WEATHER_LOADING] === false) {
        this.setState({
          [WEATHER_LOADING]: state[WEATHER_LOADING],
        });
      }
      if (this.state[FORECAST_LOADING] !== state[FORECAST_LOADING] &&
        state[FORECAST_LOADING] === false) {
        this.setState({
          [FORECAST_LOADING]: state[FORECAST_LOADING],
        });
      }
    };

    store.subscribe(this.subscribtion);
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscribtion);
  }

  render() {
    let currentCity = 0;
    let currentTemp = 0;
    let currentCond = 0;
    let currentHumidity = 0;
    let currentPressure = 0;
    let currentWind = 0;
    let currentSunrise = 0;
    let currentSunset = 0;
    if (!this.state[WEATHER_LOADING]) {
      currentCity = this.state.currentWeather.city;
      currentTemp = this.state.currentWeather.mainData.temp;
      currentCond = this.state.currentWeather.mainData.condition;
      currentHumidity = this.state.currentWeather.mainData.humidity;
      currentPressure = this.state.currentWeather.mainData.pressure;
      currentWind = this.state.currentWeather.mainData.wind;
      currentSunrise = this.state.currentWeather.mainData.sunrise;
      currentSunset = this.state.currentWeather.mainData.sunset;
    }

    return Skyact.createElement('div', {
      className: 'main-screen',
    }, [Skyact.createElement('div', {
      className: 'container',
    }, [
      Skyact.createElement('div', {
        className: 'main-data',
      }, [
        Skyact.createElement('span', null, [`${currentCity}`]),
        Skyact.createElement('h1', null, [`${currentTemp}`]),
        Skyact.createElement('span', {
          className: 'weather-phenomenon',
        }, [`${currentCond}`]),
      ]),
      Skyact.createElement('div', {
        className: 'main-weather-image',
      }, [
        // Skyact.createElement('img', {
        //   className: 'sun',
        //   src: darkSunImage,
        // }),
        Skyact.createElement('div', {
          className: 'sun',
        }),
        Skyact.createElement('img', {
          className: 'cloud1',
          src: cloud1Image,
        }),
        Skyact.createElement('img', {
          className: 'cloud2',
          src: cloud2Image,
        }),
      ]),
      Skyact.createElement(DataString, {
        currentHumidity,
        currentPressure,
        currentWind,
      }),
      Skyact.createElement('div', {
        className: 'daylight-block',
      }, [
        Skyact.createElement('div', {
          className: 'sunrise',
        }, [
          Skyact.createElement('img', {
            src: sunIcon,
          }),
          Skyact.createElement('span', null, `${currentSunrise}`),
        ]),
        Skyact.createElement('div', {
          className: 'sunset',
        }, [
          Skyact.createElement('span', null, `${currentSunset}`),
          Skyact.createElement('img', {
            src: moonImage,
          }),
        ]),
        Skyact.createElement('img', {
          className: 'daylight-line',
          src: daylightLineImage,
        }),
      ]),
      Skyact.createElement('div', {
        className: 'hours-forecast-block',
      }, [
        Skyact.createElement('h3', null, ['Today']),
        Skyact.createElement('div', {
            className: 'hours-forecast-wrapper',
          }, this.state[FORECAST_LOADING] ? [Skyact.createElement(Loader, null, [])] :
          this.state.currentWeather.hourlyForecast
          .map((forecast) => Skyact.createElement(HoursForecastData, forecast))),
      ]),
      Skyact.createElement('div', {
          className: 'days-forecast-wrapper',
        }, this.state[FORECAST_LOADING] ? [Skyact.createElement(Loader, null, [])] :
        this.state.currentWeather.daylyForecast
        .map((forecast) => Skyact.createElement(DaysForecastData, forecast))),
    ])]);
  }
}