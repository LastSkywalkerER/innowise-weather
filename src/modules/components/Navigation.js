/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import mainScreen from '../../static/weather-img/icons/main-screen.svg';
import map from '../../static/weather-img/icons/map.svg';
import citySaved from '../../static/weather-img/icons/city-saved.svg';
import menu from '../../static/weather-img/icons/menu.svg';
import store from '../Skyax/store';

import '../../styles/navigation.sass';

export default class Navigation extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', {
      className: 'navigation',
    }, [Skyact.createElement('img', {
        src: mainScreen,
        onClick: () => store.dispatch({
          type: 'CHANGE_PAGE',
          payload: 'main-screen',
        }),
      }),
      Skyact.createElement('img', {
        src: map,
      }),
      Skyact.createElement('img', {
        src: citySaved,
        onClick: () => store.dispatch({
          type: 'CHANGE_PAGE',
          payload: 'city-saved',
        }),
      }),
      Skyact.createElement('img', {
        src: menu,
      }),
    ]);
  }
}