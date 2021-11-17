/* eslint-disable indent */
import Skyact from './modules/Skyact';
import WeatherApp from './modules/WeatherApp';

import './style.sass';

Skyact.render(Skyact.createElement(WeatherApp, {
    message: 'Hey there Skyact',
    asTitle: true,
  }),
  document.getElementById('root'));

setTimeout(() => {
  console.log('updated');
  Skyact.render(Skyact.createElement(WeatherApp, {
      message: 'I was updating',
      asTitle: true,
    }, 'asd'),
    document.getElementById('root'));
}, 2000);