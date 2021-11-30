import createStore from '.';
import rootReducer from './rootReducer';

export default createStore(rootReducer, {
  currentCity: 'Minsk',
  citySaved: localStorage.getItem('citySaved') ? JSON.parse(localStorage.getItem('citySaved')) : [],
  cityList: [],
  editCities: false,
  input: null,
  weatherLoading: true,
  forecastLoading: true,
});