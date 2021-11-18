/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import HoursForecastData from '../components/HoursForecastData';
import DaysForecastData from '../components/DaysForecastData';

import darkSunImage from '../../static/weather-img/dark-sun.png';
import sunImage from '../../static/weather-img/sun.png';
import moonImage from '../../static/weather-img/moon.png';
import cloud1Image from '../../static/weather-img/cloud1.png';
import cloud2Image from '../../static/weather-img/cloud2.png';
import humidityIcon from '../../static/weather-img/icons/humidity.png';
import pressureIcon from '../../static/weather-img/icons/pressure.png';
import windIcon from '../../static/weather-img/icons/wind.png';
import cloudyIcon from '../../static/weather-img/icons/cloudy.png';
import shinyIcon from '../../static/weather-img/icons/shiny.png';
import cloudsIcon from '../../static/weather-img/icons/clouds.png';
// Skyact.createElement('', null, [])

export default class MainScreen extends Skyact.SkyactComponent {
  createHoursForecast() {
    const forecast = [{
      time: '10 AM',
      icon: cloudyIcon,
      temp: '19°',
    }, {
      time: '11 AM',
      icon: shinyIcon,
      temp: '22°',
    }, {
      time: '12 AM',
      icon: cloudyIcon,
      temp: '21°',
    }, {
      time: '01 PM',
      icon: cloudsIcon,
      temp: '18°',
    }, {
      time: '02 PM',
      icon: cloudsIcon,
      temp: '17°',
    }];
    return forecast;
  }

  createDaysForecast() {
    const forecast = [{
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
    }];
    return forecast;
  }

  render() {
    return Skyact.createElement('div', {
      className: 'main-screen',
    }, [
      Skyact.createElement('div', {
        className: 'main-data',
      }, [
        Skyact.createElement('span', null, ['San Francisco']),
        Skyact.createElement('h1', null, ['18°']),
        Skyact.createElement('span', {
          className: 'weather-phenomenon',
        }, ['Cloudy']),
      ]),
      Skyact.createElement('div', {
        className: 'main-weather-image',
      }, [
        Skyact.createElement('img', {
          src: darkSunImage,
        }),
        Skyact.createElement('img', {
          src: cloud1Image,
        }),
        Skyact.createElement('img', {
          src: cloud2Image,
        }),
      ]),
      Skyact.createElement('div', {
        className: 'data-string',
      }, [
        Skyact.createElement('div', null, [
          Skyact.createElement('img', {
            src: humidityIcon,
          }),
          Skyact.createElement('span', null, '13%'),
        ]),
        Skyact.createElement('div', null, [
          Skyact.createElement('img', {
            src: pressureIcon,
          }),
          Skyact.createElement('span', null, '0.533 mBar'),
        ]),
        Skyact.createElement('div', null, [
          Skyact.createElement('img', {
            src: windIcon,
          }),
          Skyact.createElement('span', null, '13%'),
        ]),
      ]),
      Skyact.createElement('div', {
        className: 'daylight-block',
      }, [
        Skyact.createElement('div', null, [
          Skyact.createElement('img', {
            src: sunImage,
          }),
          Skyact.createElement('span', null, '07:00 AM'),
        ]),
        Skyact.createElement('div', null, [
          Skyact.createElement('img', {
            src: moonImage,
          }),
          Skyact.createElement('span', null, '06:00 PM'),
        ]),
      ]),
      Skyact.createElement('div', {
        className: 'hours-forecast-block',
      }, [
        Skyact.createElement('h3', null, ['Today']),
        Skyact.createElement('div', {
            className: 'hours-forecast-wrapper',
          }, this.createHoursForecast()
          .map((forecast) => Skyact.createElement(HoursForecastData, forecast))),
      ]),
      Skyact.createElement('div', {
          className: 'days-forecast-wrapper',
        }, this.createDaysForecast()
        .map((forecast) => Skyact.createElement(DaysForecastData, forecast))),
    ]);
  }
}