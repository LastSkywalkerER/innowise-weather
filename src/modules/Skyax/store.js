import createStore from '.';
import rootReducer from './rootReducer';
import {
  startSettings,
} from '../config';

export default createStore(rootReducer, {
  currentCity: 'Minsk',
  location: 'Minsk',
  citySaved: localStorage.getItem('citySaved') ? JSON.parse(localStorage.getItem('citySaved')) : [],
  cityList: [],
  editCities: false,
  input: null,
  weatherLoading: true,
  forecastLoading: true,
  locationWeatherLoading: true,
  settings: localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : startSettings,
});