import store from './skyax/store';
import { setCurrentCity, setLocation, setError } from './skyax/actions';

// https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${openweathermapApiKey}

const getCityByCoords = (coords, callback) => {
  fetch(
    `https://geocode-maps.yandex.ru/1.x?apikey=547fe294-cefc-42fa-bb6a-0e41d05b4faa&geocode=${coords.longitude},${coords.latitude}&format=json&lang=en_US`,
  )
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(new Error(response.status));
    })
    .then((data) => callback(data))
    .catch((e) => {
      if (e.message === '404') {
        store.dispatch(setError('Location not found'));
        return;
      }
      // eslint-disable-next-line no-console
      console.warn(e);
    });
};

const geoSuccess = (position) => {
  getCityByCoords(position.coords, (data) => {
    const locationName =
      data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(
        ', ',
      );
    store.dispatch(
      setLocation(
        `${locationName[0]}, ${locationName[locationName.length - 1]}`,
      ),
    );
    store.dispatch(
      setCurrentCity(
        `${locationName[0]}, ${locationName[locationName.length - 1]}`,
      ),
    );
  });
};
const geoError = (error) => {
  if (error.code === 0 && error.code === 2 && error.code === 3) {
    store.dispatch(setError('Location not found'));
    return;
  }
  if (error.code === 1 && store.getState().location === 'No location') {
    store.dispatch(setError('No access to geolocation'));
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(`Error in geo occurred. Error code: ${error.code}`);
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
