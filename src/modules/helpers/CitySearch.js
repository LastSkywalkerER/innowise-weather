/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import {
  weathermapApiKey,
} from '../Skyax/constants';
import store from '../Skyax/store';
import {
  updateCityList,
  addCitySaved,
  setInputValue,
  clearCitySaved,
} from '../Skyax/actions';

import iconsRoundedParser from './iconsRoundedParser';

export default class MainWeather {
  constructor() {
    this.searchField = '';
    this.cityList = [];
    this.savedCities = store.getState().citySaved;
    this.dataList = [];
    this.callBody = 'https://api.weatherapi.com/v1';
  }

  getResponseFromApi(action, city, callback) {
    fetch(`${this.callBody}${action}?key=${weathermapApiKey}&q=${city}`)
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

  getCitiesList() {
    store.subscribe((state) => {
      if (state.input.value !== this.searchField) {
        const string = state.input.value;
        this.searchField = string;
        const action = '/search.json';
        if (string !== '') {
          this.getResponseFromApi(action, string, (data) => {
            this.cityList = data.map((dataItem) => ({
              name: this.cityNameCorrection(dataItem.name),
            }));
            store.dispatch(updateCityList(this.cityList));
          });
        }
      }
    });
  }

  downLoadCitiesData(update) {
    if (update) {
      this.savedCities = store.getState().citySaved;
    }
    const action = '/current.json';
    store.dispatch(clearCitySaved());
    this.dataList = [];
    if (this.savedCities.length) {
      this.savedCities.forEach((city) => this.getResponseFromApi(action, city.name, (data) => {
        this.dataList.push({
          city: data.location.name,
          country: data.location.country,
          temp: `${data.current.temp_c}°`,
          icon: iconsRoundedParser(data.current.condition.text),
          humidity: `${data.current.humidity}%`,
          wind: `${data.current.wind_kph}\u00A0km/h`,
        });
        store.dispatch(addCitySaved(city));
      }));
    }
  }

  addCity() {
    const name = this.cityList.find((item) => item.name === this.searchField);
    if (name) {
      store.dispatch(setInputValue(''));
      this.savedCities.push(name);
      this.downLoadCitiesData();
    }
  }
}