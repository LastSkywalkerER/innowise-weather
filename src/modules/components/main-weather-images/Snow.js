/* eslint-disable class-methods-use-this */
import Skyact from '../../Skyact';
import store from '../../Skyax/store';

import cloud1Image from '../../../static/weather-img/main-weather-image/cloud1.png';
import cloud2Image from '../../../static/weather-img/main-weather-image/cloud2.png';
import blobDark from '../../../static/weather-img/main-weather-image/snowflake-dark.png';
import bloblight from '../../../static/weather-img/main-weather-image/snowflake-light.png';

const checkTheme = (darkMode, lightMode) => {
  // eslint-disable-next-line prefer-destructuring
  const theme = store.getState().settings.Theme;

  if (theme === 'Dark') {
    return darkMode;
  }
  if (theme === 'Light') {
    return lightMode;
  }
  return blobDark;
};

export default class Snow extends Skyact.SkyactComponent {
  render() {
    const blob = checkTheme(blobDark, bloblight);

    return Skyact.createElement('div', null, [
      Skyact.createElement('div', {
        className: 'cloud1 animation-cloud1',
      }, [
        Skyact.createElement('img', {
          className: 'cloud',
          src: cloud1Image,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-snowflake animation-blob1',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-snowflake animation-blob2',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-snowflake animation-blob3',
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
          className: 'blob animation-snowflake animation-blob1',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-snowflake animation-blob2',
          src: blob,
        }),
        Skyact.createElement('img', {
          className: 'blob animation-snowflake animation-blob3',
          src: blob,
        }),
      ]),
    ]);
  }
}