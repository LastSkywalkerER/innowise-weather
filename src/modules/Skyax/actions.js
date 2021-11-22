import {
  CHANGE_PAGE,
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