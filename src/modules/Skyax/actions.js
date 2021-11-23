import {
  CHANGE_PAGE,
  SET_CURRENT_WEATHER,
  LOADING,
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

export function upLoading() {
  return {
    type: LOADING,
    payload: true,
  };
}

export function downLoading() {
  return {
    type: LOADING,
    payload: false,
  };
}