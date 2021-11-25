/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import {
  weathermapApiKey,
  CITIES_LOADING,
} from '../Skyax/constants';
import store from '../Skyax/store';
import {
  downLoading,
  upLoading,
} from '../Skyax/actions';

export default class MainWeather {
  constructor() {
    this.searchField = '';
    this.cityList = [];
    this.dataList = [];
    this.callBody = 'https://api.weatherapi.com/v1';
    store.dispatch(upLoading(CITIES_LOADING));
  }

  getResponseFromApi(action, callback) {
    fetch(`${this.callBody}${action}?key=${weathermapApiKey}&q=${this.searchField}`)
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

  cityNameCorrection(name) {
    const nameData = name.split(', ');
    return `${nameData[0]}, ${nameData[2]}`;
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

  getCitiesList(string) {
    this.searchField = string;
    const action = '/search.json';
    if (string !== '') {
      this.getResponseFromApi(action, (data) => {
        this.cityList = data.map((dataItem) => ({
          name: this.cityNameCorrection(dataItem.name),
        }));
        store.dispatch(downLoading(CITIES_LOADING));
      });
    }
  }
}