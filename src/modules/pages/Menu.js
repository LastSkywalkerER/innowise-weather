/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import Skyact from '../Skyact';
import DataString from '../components/DataString';
import Settings from '../components/Settings';
// Skyact.createElement('', null, [])

import geo from '../../static/weather-img/icons/geo.svg';

import '../../styles/menu.sass';

export default class Menu extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.settings = [{
        title: 'Temperature',
        options: [{
            name: 'Celcius',
          },
          {
            name: 'Fahrenheit',
          },
        ],
      },
      {
        title: 'Wind Speed',
        options: [{
            name: 'km/h',
          },
          {
            name: 'ml/h',
          },
        ],
      },
      {
        title: 'Theme',
        options: [{
            name: 'Dark',
          },
          {
            name: 'Light',
          },
        ],
      },
    ];
  }

  render() {
    return Skyact.createElement('div', {
      className: 'menu container',
    }, [
      Skyact.createElement('div', {
        className: 'location-title',
      }, [
        Skyact.createElement('img', {
          src: geo,
        }, []),
        Skyact.createElement('h5', null, ['Your Location Now']),
      ]),
      Skyact.createElement('h4', null, ['San Fransisco, California, USA']),
      Skyact.createElement('div', {
        className: 'weather-image',
      }, [
        Skyact.createElement('div', {
          className: 'sun',
        }, []),
      ]),
      Skyact.createElement('span', {
        className: 'weather-phenomenon',
      }, ['Moonlight']),
      Skyact.createElement('h3', {
        className: 'temperature',
      }, ['20°C']),
      Skyact.createElement(DataString, {
        currentHumidity: '7%',
        currentPressure: '0.533 mBar',
        currentWind: '5km/h',
      }),
      Skyact.createElement('div', {
        className: 'settings',
      }, this.settings.map((setting) => Skyact.createElement(Settings, setting))),
    ]);
  }
}