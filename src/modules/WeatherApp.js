/* eslint-disable class-methods-use-this */
import Skyact from './Skyact';
import MainScreen from './pages/MainScreen';
import Navigation from './components/Navigation';

export default class WeatherApp extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', null,
      [
        Skyact.createElement('a', {
          className: 'designer-bio',
          href: 'https://linktr.ee/adinyanuar',
        }, 'Designed by Adin Yanuar'),
        Skyact.createElement(MainScreen, null),
        Skyact.createElement(Navigation, null),
      ]);
  }
}