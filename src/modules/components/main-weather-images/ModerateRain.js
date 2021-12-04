/* eslint-disable class-methods-use-this */
import Skyact from '../../Skyact';

import cloud1Image from '../../../static/weather-img/main-weather-image/cloud1.png';
import cloud2Image from '../../../static/weather-img/main-weather-image/cloud2.png';
import blob from '../../../static/weather-img/main-weather-image/blob.png';

export default class ModerateRain extends Skyact.SkyactComponent {
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
          className: 'blob animation-blob animation-blob1',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob2',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob3',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob4',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob5',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob6',
          src: blob,
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
          className: 'blob animation-blob animation-blob1',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob2',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob3',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob4',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob5',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-blob animation-blob6',
          src: blob,
        }),
      ]),
    ]);
  }
}