/* eslint-disable class-methods-use-this */
import Skyact from '../../Skyact';

import cloud1Image from '../../../static/weather-img/main-weather-image/cloud1.png';
import cloud2Image from '../../../static/weather-img/main-weather-image/cloud2.png';

export default class OvercastClouds extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', null, [
      Skyact.createElement('img', {
        className: 'cloud1 animation-cloud1',
        src: cloud1Image,
      }),
      Skyact.createElement('img', {
        className: 'cloud2 animation-cloud2',
        src: cloud2Image,
      }),
    ]);
  }
}