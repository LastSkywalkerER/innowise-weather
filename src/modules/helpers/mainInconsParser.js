import ClearSky from '../components/main-weather-images/ClearSky';
import FewClouds from '../components/main-weather-images/FewClouds';
import OvercastClouds from '../components/main-weather-images/OvercastClouds';
import LightRain from '../components/main-weather-images/LightRain';
import Rain from '../components/main-weather-images/Rain';
import ModerateRain from '../components/main-weather-images/ModerateRain';
import LightSnow from '../components/main-weather-images/LightSnow';
import Snow from '../components/main-weather-images/Snow';
import ModerateSnow from '../components/main-weather-images/ModerateSnow';
import Thunder from '../components/main-weather-images/Thunder';

import store from '../Skyax/store';

const checkTheme = (darkMode, lightMode) => {
  // eslint-disable-next-line prefer-destructuring
  const theme = store.getState().settings.Theme;

  if (theme === 'Dark') {
    return darkMode;
  }
  if (theme === 'Light') {
    return lightMode;
  }
  return FewClouds;
};

export default (type) => {
  console.log(type.toLowerCase());
  switch (type.toLowerCase()) {
    case 'clear sky':
      return ClearSky;
    case 'broken clouds':
      return OvercastClouds;
    case 'overcast clouds':
      return OvercastClouds;
    case 'scattered clouds':
      return FewClouds;
    case 'few clouds':
      return FewClouds;
    case 'light rain':
      return LightRain;
    case 'rain':
      return Rain;
    case 'moderate rain':
      return ModerateRain;
    case 'heavy rain':
      return ModerateRain;
    case 'shower':
      return ModerateRain;
    case 'light snow':
      return LightSnow;
    case 'snow':
      return Snow;
    case 'moderate snow':
      return ModerateSnow;
    case 'heavy snow':
      return ModerateSnow;
    case 'thunder':
      return Thunder;
    case 'lightning':
      return Thunder;
    case 'storm':
      return Thunder;
    default:
      return FewClouds;
  }
};