/* eslint-disable class-methods-use-this */
import Skyact from '../../Skyact';

import cloud1Image from '../../../static/weather-img/main-weather-image/cloud1.png';
import cloud2Image from '../../../static/weather-img/main-weather-image/cloud2.png';
import thunder from '../../../static/weather-img/main-weather-image/thunder.png';
import thunderSm from '../../../static/weather-img/main-weather-image/thunder-sm.png';

export default class Rain extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', null, [
      Skyact.createElement('div', {
        className: 'cloud1 animation-cloud1',
      }, [
        Skyact.createElement('img', {
          className: 'cloud',
          src: cloud1Image,
        }),
        Skyact.createElement('img', {
          className: 'thunder animation-thunder animation-thunder1',
          src: thunder,
        }),
        Skyact.createElement('img', {
          className: 'thunder-sm animation-thunder animation-thunder1',
          src: thunderSm,
        }),
      ]),
      Skyact.createElement('div', {
        className: 'cloud2 animation-cloud2',
      }, [
        Skyact.createElement('img', {
          className: 'cloud',
          src: cloud2Image,
        }),
        Skyact.createElement('img', {
          className: 'thunder-sm animation-thunder animation-thunder2',
          src: thunderSm,
        }),
      ]),
    ]);
  }
}