/* eslint-disable class-methods-use-this */
import {
  weatherApiKey,
} from './Skyax/constants';
import store from './Skyax/store';
import {
  downLoading,
} from './Skyax/actions';

export default class MainWeather {
  constructor() {
    this.city = store.getState().currentCity;
    this.mainData = {};
    this.hourlyForecast = {};
    this.daylyDorecast = {};
    this.callBody = 'https://api.weatherapi.com/v1';
  }

  getResponseFromApi(action, callback) {
    fetch(`${this.callBody}${action}?key=${weatherApiKey}&q=${this.city}&days=7&aqi=no&alerts=no`)
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => callback(data));
  }

  getMainData() {
    const action = '/forecast.json';
    this.getResponseFromApi(action, (data) => {
      this.mainData.temp = data.current.temp_c;
      this.mainData.condition = data.current.condition.text;
      this.mainData.humidity = data.current.humidity;
      this.mainData.pressure = data.current.pressure_mb / 1000;
      this.mainData.wind = data.current.wind_kph;
      this.mainData.sunrise = data.forecast.forecastday[0].astro.sunrise;
      this.mainData.sunset = data.forecast.forecastday[0].astro.sunset;
      // store.dispatch(setWeatherInCurrentCity(this));
      store.dispatch(downLoading());
      // console.log(data);
    });
  }
}