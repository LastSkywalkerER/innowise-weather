import {
  openweathermapApiKey,
} from './Skyax/constants';
import store from './Skyax/store';
import {
  setCurrentCity,
  setLocation,
} from './Skyax/actions';

const getCityByCoords = (coords, callback) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${openweathermapApiKey}`)
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => callback(data));
};

const geoSuccess = (position) => {
  getCityByCoords(position.coords, (data) => {
    store.dispatch(setLocation(`${data.name}, ${data.sys.country}`));
    store.dispatch(setCurrentCity(`${data.name}, ${data.sys.country}`));
  });
};
const geoError = (error) => {
  console.log(`Error in geo occurred. Error code: ${error.code}`);
  // error.code can be:
  //   0: unknown error
  //   1: permission denied
  //   2: position unavailable (error response from location provider)
  //   3: timed out
};

navigator.geolocation.getCurrentPosition(geoSuccess, geoError);