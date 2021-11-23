import {
  weatherApiKey,
} from './Skyax/constants';
import store from './Skyax/store';
import {
  setSunsetInCurrentCity,
} from './Skyax/actions';

const getWeather = (city, callback) => {
  fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${weatherApiKey}&q=${city}&aqi=no`)
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      callback(data.astronomy.astro);
    });
};

export default function () {
  getWeather(store.getState().currentCity, (data) => {
    store.dispatch(setSunsetInCurrentCity(data));
  });
}