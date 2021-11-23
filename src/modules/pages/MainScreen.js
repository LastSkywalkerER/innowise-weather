/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import HoursForecastData from '../components/HoursForecastData';
import DaysForecastData from '../components/DaysForecastData';
import Humidity from '../components/Humidity';
import Wind from '../components/Wind';
import store from '../Skyax/store';
import MainWeather from '../MainWeather';

import darkSunImage from '../../static/weather-img/dark-sun.png';
// import sunImage from '../../static/weather-img/sun.png';
import moonImage from '../../static/weather-img/moon.png';
import daylightLineImage from '../../static/weather-img/daylight-line.png';
import cloud1Image from '../../static/weather-img/cloud1.png';
import cloud2Image from '../../static/weather-img/cloud2.png';
import pressureIcon from '../../static/weather-img/icons/pressure.svg';
import sunIcon from '../../static/weather-img/icons/sun.svg';
import cloudyIcon from '../../static/weather-img/icons/cloudy.svg';
import shinyIcon from '../../static/weather-img/icons/shiny.svg';
import cloudsIcon from '../../static/weather-img/icons/clouds.svg';
// Skyact.createElement('', null, [])

import '../../styles/main-screen.sass';

export default class MainScreen extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentWeather: new MainWeather(),
      forecastHours: [{
        time: '10\u00A0AM',
        icon: cloudyIcon,
        temp: '19°',
      }, {
        time: '11\u00A0AM',
        icon: shinyIcon,
        temp: '22°',
      }, {
        time: '12\u00A0AM',
        icon: cloudyIcon,
        temp: '21°',
      }, {
        time: '01\u00A0PM',
        icon: cloudsIcon,
        temp: '18°',
      }, {
        time: '02\u00A0PM',
        icon: cloudsIcon,
        temp: '17°',
      }],
      forecastDays: [{
        day: 'Tuesday',
        icon: cloudyIcon,
        temp1: '19°',
        temp2: '15°',
      }, {
        day: 'Wednesday',
        icon: cloudyIcon,
        temp1: '19°',
        temp2: '15°',
      }, {
        day: 'Thursday',
        icon: shinyIcon,
        temp1: '18°',
        temp2: '14°',
      }],
    };
  }

  componentDidMount() {
    this.state.currentWeather.getMainData();
    store.subscribe((state) => {
      this.setState({
        loading: state.weatherLoading,
      });
    });
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
    if (!this.state.loading) {
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
      className: 'main-screen container',
    }, [
      Skyact.createElement('div', {
        className: 'main-data',
      }, [
        Skyact.createElement('span', null, [`${currentCity}`]),
        Skyact.createElement('h1', null, [`${currentTemp}°`]),
        Skyact.createElement('span', {
          className: 'weather-phenomenon',
        }, [`${currentCond}`]),
      ]),
      Skyact.createElement('div', {
        className: 'main-weather-image',
      }, [
        Skyact.createElement('img', {
          className: 'sun',
          src: darkSunImage,
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
      Skyact.createElement('div', {
        className: 'data-string',
      }, [
        Skyact.createElement(Humidity, {
          humidity: `${currentHumidity}%`,
        }),
        Skyact.createElement('div', null, [
          Skyact.createElement('img', {
            src: pressureIcon,
          }),
          Skyact.createElement('span', null, `${currentPressure}\u00A0mBar`),
        ]),
        Skyact.createElement(Wind, {
          wind: `${currentWind}km/h`,
        }),
      ]),
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
          }, this.state.forecastHours
          .map((forecast) => Skyact.createElement(HoursForecastData, forecast))),
      ]),
      Skyact.createElement('div', {
          className: 'days-forecast-wrapper',
        }, this.state.forecastDays
        .map((forecast) => Skyact.createElement(DaysForecastData, forecast))),
    ]);
  }
}