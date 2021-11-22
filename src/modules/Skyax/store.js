import createStore from '.';
import rootReducer from './rootReducer';

export default createStore(rootReducer, {
  page: 'main-screen',
});