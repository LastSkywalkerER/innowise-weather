import {
  CHANGE_PAGE,
  SET_CURRENT_WEATHER,
  LOADING,
} from './constants';

export default function rootReducer(state, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
      };
    case LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      break;
  }

  return state;
}