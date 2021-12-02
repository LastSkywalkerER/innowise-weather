/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import {
  CHANGE_SETTINGS,
} from '../Skyax/constants';
import store from '../Skyax/store';

export default class ChangeTheme {
  constructor() {
    this.themes = {};
  }

  addTheme(name, theme) {
    this.themes[name] = theme;
  }

  setTheme(theme) {
    this.currentTheme = this.themes[theme];
    this.themeName = theme;
    localStorage.setItem('themeName', theme);
    this.currentTheme.forEach(
      (elem) => document.documentElement.style.setProperty(elem.name, elem.color),
    );
  }

  start() {
    this.themeName = localStorage.getItem('themeName') ? localStorage.getItem('themeName') : store.getState().settings.Theme;
    this.setTheme(this.themeName);

    this.subscribe = (state, type) => {
      if (type === CHANGE_SETTINGS && state.settings.Theme !== this.themeName) {
        this.setTheme(state.settings.Theme);
      }
    };

    store.subscribe(this.subscribe);
  }
}