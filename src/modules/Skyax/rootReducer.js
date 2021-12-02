import {
  SET_CURRENT_CITY,
  SET_LOCATION,
  LOADING,
  UPDATE_LIST_CITY,
  ADD_SAVED_CITY,
  REMOVE_SAVED_CITY,
  CLEAR_SAVED_CITY,
  EDIT_CITIES,
  SET_INPUT,
  SET_INPUT_VALUE,
  CHANGE_SETTINGS,
  ERROR,
} from './constants';

export default function rootReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
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
    case ADD_SAVED_CITY: {
      const newList = [...state.citySaved, action.payload];
      localStorage.setItem('citySaved', JSON.stringify(newList));
      return {
        ...state,
        citySaved: newList,
      };
    }
    case REMOVE_SAVED_CITY: {
      const newList = state.citySaved.filter((city, i) => {
        if (i === action.payload) {
          return false;
        }
        return true;
      });
      localStorage.setItem('citySaved', JSON.stringify(newList));
      return {
        ...state,
        citySaved: newList,
      };
    }
    case CLEAR_SAVED_CITY:
      localStorage.setItem('citySaved', JSON.stringify([]));
      return {
        ...state,
        citySaved: [],
      };
    case EDIT_CITIES:
      return {
        ...state,
        editCities: action.payload,
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
    case CHANGE_SETTINGS:
      localStorage.setItem('settings', JSON.stringify({
        ...state.settings,
        ...action.payload,
      }));
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}