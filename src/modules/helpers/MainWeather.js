/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import {
  openweathermapApiKey,
  WEATHER_LOADING,
  FORECAST_LOADING,
} from '../Skyax/constants';
import store from '../Skyax/store';
import {
  downLoading,
  upLoading,
} from '../Skyax/actions';
import inconsParser from './inconsParser';

export default class MainWeather {
  constructor() {
    this.countOfHourlyForecast = 5;
    this.countOfDailyForecast = 3;
    this.city = store.getState().currentCity;
    this.currentData = new Date();
    this.mainData = {};
    this.hourlyForecast = [];
    this.daylyForecast = [];
    this.callBody = 'https://api.openweathermap.org/data/2.5';
    store.dispatch(upLoading(WEATHER_LOADING));
    store.dispatch(upLoading(FORECAST_LOADING));
  }

  getResponseFromApi(action, callback) {
    fetch(`${this.callBody}${action}?q=${this.city}&appid=${openweathermapApiKey}`)
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => callback(data));
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
      case 7:
        return 'Sunday';
      default:
        return 'Weekends';
    }
  }

  getMainData() {
    const action = '/weather';
    this.getResponseFromApi(action, (data) => {
      this.mainData.temp = this.kelvinToCelsium(data.main.temp);
      this.mainData.condition = this.stringCorrection(data.weather[0].description);
      this.mainData.humidity = `${data.main.humidity}%`;
      this.mainData.pressure = `${data.main.pressure / 10}\u00A0MPa`;
      this.mainData.wind = `${data.wind.speed}\u00A0km/h`;
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
      for (let i = 0; i < this.countOfHourlyForecast; i++) {
        this.hourlyForecast.push({
          time: this.hoursCorrection(data.list[i].dt),
          icon: inconsParser(data.list[i].weather[0].description),
          temp: this.kelvinToCelsium(data.list[i].main.temp),
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
          temp1: this.kelvinToCelsium(maxKelvTemp),
          temp2: this.kelvinToCelsium(minKelvTemp),
        });
        i += 8;
        day++;
      }

      store.dispatch(downLoading(FORECAST_LOADING));
    });
  }
}