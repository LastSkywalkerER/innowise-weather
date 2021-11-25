import {
  CHANGE_PAGE,
  SET_CURRENT_WEATHER,
  LOADING,
  UPDATE_LIST_CITY,
  ADD_SAVED_CITY,
  CLEAR_SAVED_CITY,
  SET_INPUT,
  SET_INPUT_VALUE,
  pages,
} from './constants';

export function setMainScreen() {
  return {
    type: CHANGE_PAGE,
    payload: pages.mainScreen,
  };
}

export function setCitySaved() {
  return {
    type: CHANGE_PAGE,
    payload: pages.citySaved,
  };
}

export function setMenu() {
  return {
    type: CHANGE_PAGE,
    payload: pages.menu,
  };
}

export function setWeatherInCurrentCity(weather) {
  return {
    type: SET_CURRENT_WEATHER,
    payload: weather,
  };
}

export function upLoading(loader) {
  return {
    type: LOADING,
    payload: {
      [loader]: true,
    },
  };
}

export function downLoading(loader) {
  return {
    type: LOADING,
    payload: {
      [loader]: false,
    },
  };
}

export function updateCityList(list) {
  return {
    type: UPDATE_LIST_CITY,
    payload: list,
  };
}

export function addCitySaved(name) {
  return {
    type: ADD_SAVED_CITY,
    payload: name,
  };
}

export function clearCitySaved() {
  return {
    type: CLEAR_SAVED_CITY,
  };
}

export function setInput(input) {
  return {
    type: SET_INPUT,
    payload: input,
  };
}

export function setInputValue(value) {
  return {
    type: SET_INPUT_VALUE,
    payload: value,
  };
}