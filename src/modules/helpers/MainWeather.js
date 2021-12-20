/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import {
  openweathermapApiKey,
  WEATHER_LOADING,
  FORECAST_LOADING,
  LOCATION_WEATHER_LOADING,
} from '../Skyax/constants';
import store from '../Skyax/store';
import { downLoading, setError } from '../Skyax/actions';
import inconsParser from './inconsParser';

export default class MainWeather {
  constructor() {
    this.countOfHourlyForecast = 5;
    this.countOfDailyForecast = 3;
    this.currentData = new Date();
    this.mainData = {};
    this.hourlyForecast = [];
    this.daylyForecast = [];
    this.locationWeather = {};
    this.callBody = 'https://api.openweathermap.org/data/2.5';
  }

  getResponseFromApi(action, callback, city = store.getState().currentCity) {
    if (city !== 'No location') {
      fetch(`${this.callBody}${action}?q=${city}&appid=${openweathermapApiKey}`)
        // eslint-disable-next-line consistent-return
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
          return Promise.reject(new Error(response.status));
        })
        .then((data) => callback(data))
        .catch((e) => {
          if (e.message === '404') {
            store.dispatch(
              setError(`${store.getState().currentCity} not found`),
            );
            return;
          }
          console.warn(e);
        });
    }
  }

  stringCorrection(string) {
    const newString = String(string).replace(/\s/, '\u00A0');
    return newString[0].toUpperCase() + newString.slice(1);
  }

  hoursCorrection(sec) {
    return new Date(sec * 1000).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  kelvinToCelsium(kelvin) {
    return `${Math.round(kelvin - 273.15, 0)}°`;
  }

  kelvinToFahrenheit(kelvin) {
    return `${Math.round(((kelvin - 273.15) * 9) / 5 + 32, 0)}°`;
  }

  getTemp(kelvin) {
    const settings = store.getState().settings;
    if (settings.Temperature === 'Celcius') {
      return this.kelvinToCelsium(kelvin);
    }
    if (settings.Temperature === 'Fahrenheit') {
      return this.kelvinToFahrenheit(kelvin);
    }
    return 'nothing';
  }

  getWind(wind) {
    const settings = store.getState().settings;
    if (settings['Wind Speed'] === 'km/h') {
      return `${wind}\u00A0km/h`;
    }
    if (settings['Wind Speed'] === 'mp/h') {
      return `${Math.round(wind / 1.609, 2)}\u00A0mp/h`;
    }
    return 'nothing';
  }

  parseDay(day) {
    switch (new Date(day * 1000).getDay()) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 0:
        return 'Sunday';
      default:
        return 'Weekends';
    }
  }

  getMainData() {
    const action = '/weather';
    this.getResponseFromApi(action, (data) => {
      this.mainData.temp = this.getTemp(data.main.temp);
      this.mainData.condition = this.stringCorrection(
        data.weather[0].description,
      );
      this.mainData.humidity = `${data.main.humidity}%`;
      this.mainData.pressure = `${data.main.pressure / 10}\u00A0MPa`;
      this.mainData.wind = this.getWind(data.wind.speed);
      this.mainData.sunrise = this.hoursCorrection(data.sys.sunrise);
      this.mainData.sunset = this.hoursCorrection(data.sys.sunset);
      // store.dispatch(setWeatherInCurrentCity(this));
      store.dispatch(downLoading(WEATHER_LOADING));
      // console.log(data);
    });
  }

  getForecast() {
    const action = '/forecast';
    this.getResponseFromApi(action, (data) => {
      // const map = new Map();
      // data.list.map((list) => map.set(list.weather[0].description, list.weather[0].description));
      // console.dir(map);
      for (let i = 0; i < this.countOfHourlyForecast; i++) {
        this.hourlyForecast.push({
          time: this.hoursCorrection(data.list[i].dt),
          icon: inconsParser(data.list[i].weather[0].description),
          temp: this.getTemp(data.list[i].main.temp),
        });
      }

      let day = 0;
      let i = 0;
      const currentDate = this.currentData.getDate();

      while (currentDate === new Date(data.list[i].dt * 1000).getDate()) {
        i++;
      }

      while (day < this.countOfDailyForecast) {
        let minKelvTemp = 400;
        let maxKelvTemp = 0;
        for (let j = i + 1; j < i + 1 + 8; j++) {
          if (data.list[i].main.temp <= minKelvTemp) {
            minKelvTemp = data.list[i].main.temp;
          }
          if (data.list[i].main.temp >= maxKelvTemp) {
            maxKelvTemp = data.list[i].main.temp;
          }
        }
        this.daylyForecast.push({
          day: this.parseDay(data.list[i + 4].dt),
          icon: inconsParser(data.list[i + 4].weather[0].description),
          temp1: this.getTemp(maxKelvTemp),
          temp2: this.getTemp(minKelvTemp),
        });
        i += 8;
        day++;
      }

      store.dispatch(downLoading(FORECAST_LOADING));
    });
  }

  getWeatherByLocation() {
    const action = '/weather';
    const location = store.getState().location;

    this.getResponseFromApi(
      action,
      (data) => {
        this.locationWeather.location = location;
        this.locationWeather.condition = this.stringCorrection(
          data.weather[0].description,
        );
        this.locationWeather.temp = this.getTemp(data.main.temp);
        this.locationWeather.humidity = `${data.main.humidity}%`;
        this.locationWeather.pressure = `${data.main.pressure / 10}\u00A0MPa`;
        this.locationWeather.wind = this.getWind(data.wind.speed);

        store.dispatch(downLoading(LOCATION_WEATHER_LOADING));
      },
      location,
    );
  }
}
