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