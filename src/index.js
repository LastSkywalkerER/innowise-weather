/* eslint-disable indent */
import Skyact from './modules/Skyact';
import WeatherApp from './modules/WeatherApp';
// import 'normalize-scss';

import './styles/normalize.css';
import './style.sass';

window.addEventListener('load', () => {
  Skyact.render(Skyact.createElement(WeatherApp),
    document.getElementById('root'));
});