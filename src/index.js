/* eslint-disable indent */
import Skyact from './modules/Skyact/Skyact';
import WeatherApp from './modules/WeatherApp';

import './style.sass';

Skyact.render(Skyact.createElement(WeatherApp, {
    message: 'Hey there Skyact',
  }),
  document.getElementById('root'));