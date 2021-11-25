import {
  CHANGE_PAGE,
  SET_CURRENT_WEATHER,
  LOADING,
  UPDATE_LIST_CITY,
  ADD_SAVED_CITY,
  CLEAR_SAVED_CITY,
  SET_INPUT,
  SET_INPUT_VALUE,
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
    case UPDATE_LIST_CITY:
      return {
        ...state,
        cityList: [...action.payload],
      };
    case ADD_SAVED_CITY:
      return {
        ...state,
        citySaved: [...state.citySaved, action.payload],
      };
    case CLEAR_SAVED_CITY:
      return {
        ...state,
        citySaved: [],
      };
    case SET_INPUT_VALUE:
      // eslint-disable-next-line no-param-reassign
      state.input.value = action.payload;
      return {
        ...state,
      };
    case SET_INPUT:
      return {
        ...state,
        input: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}