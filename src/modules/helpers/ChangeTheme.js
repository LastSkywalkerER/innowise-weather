/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import { CHANGE_SETTINGS } from '../skyax/constants';
import store from '../skyax/store';

export default class ChangeTheme {
  constructor() {
    this.themes = {};
  }

  addTheme(name, theme) {
    this.themes[name] = theme;
  }

  setTheme(theme) {
    this.themeName = theme[0].toUpperCase() + theme.slice(1);
    this.currentTheme = this.themes[this.themeName];
    localStorage.setItem('themeName', this.themeName);
    this.currentTheme.forEach((elem) =>
      document.documentElement.style.setProperty(elem.name, elem.color),
    );
  }

  start() {
    this.themeName = localStorage.getItem('themeName')
      ? localStorage.getItem('themeName')
      : store.getState().settings.Theme;
    this.setTheme(this.themeName);

    this.subscribe = (state, type) => {
      if (type === CHANGE_SETTINGS && state.settings.Theme !== this.themeName) {
        this.setTheme(state.settings.Theme);
      }
    };

    store.subscribe(this.subscribe);
  }
}
