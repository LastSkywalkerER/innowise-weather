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
} from './constants';

export function setCurrentCity(city) {
  return {
    type: SET_CURRENT_CITY,
    payload: city,
  };
}

export function setLocation(city) {
  return {
    type: SET_LOCATION,
    payload: city,
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

export function removeCitySaved(index) {
  return {
    type: REMOVE_SAVED_CITY,
    payload: index,
  };
}

export function clearCitySaved() {
  return {
    type: CLEAR_SAVED_CITY,
  };
}

export function editCities(toggler) {
  return {
    type: EDIT_CITIES,
    payload: toggler,
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

export function changeSettings(value) {
  return {
    type: CHANGE_SETTINGS,
    payload: value,
  };
}