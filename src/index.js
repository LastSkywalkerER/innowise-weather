/* eslint-disable indent */
import Skyact from './modules/Skyact';
import WeatherApp from './modules/WeatherApp';

import './style.sass';

Skyact.render(Skyact.createElement(WeatherApp),
  document.getElementById('root'));