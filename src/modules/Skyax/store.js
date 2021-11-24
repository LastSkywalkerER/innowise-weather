import createStore from '.';
import rootReducer from './rootReducer';
import {
  pages,
} from './constants';

export default createStore(rootReducer, {
  page: pages.mainScreen,
  currentCity: 'Minsk',
  forecastLoading: true,
  weatherLoading: true,
});