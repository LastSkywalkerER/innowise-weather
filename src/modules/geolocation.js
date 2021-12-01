import {
  openweathermapApiKey,
} from './Skyax/constants';
import store from './Skyax/store';
import {
  setCurrentCity,
  setLocation,
} from './Skyax/actions';

// https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${openweathermapApiKey}

const getCityByCoords = (coords, callback) => {
  fetch(`https://geocode-maps.yandex.ru/1.x?apikey=547fe294-cefc-42fa-bb6a-0e41d05b4faa&geocode=${coords.longitude},${coords.latitude}&format=json&lang=en_US`)
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
    const locationName = data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(', ');
    store.dispatch(setLocation(`${locationName[locationName.length - 2]}, ${locationName[locationName.length - 1]}`));
    store.dispatch(setCurrentCity(`${locationName[locationName.length - 2]}, ${locationName[locationName.length - 1]}`));
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

navigator.geolocation.getCurrentPosition(geoSuccess, geoError, {
  maximumAge: 0,
  timeout: 5000,
  enableHighAccuracy: true,
});