// import sunIcon from '../../static/weather-img/icons/sun.svg';
// import cloudyIcon from '../../static/weather-img/icons/cloudy.svg';
import shinyIcon from '../../static/weather-img/icons/shiny.svg';
// import cloudsIcon from '../../static/weather-img/icons/clouds.svg';

import sun from '../../static/weather-img/icons/forecast-icons/sun.svg';
import clouds from '../../static/weather-img/icons/forecast-icons/clouds.svg';
import sunnyСlouds from '../../static/weather-img/icons/forecast-icons/sunny-clouds.svg';
import lightRain from '../../static/weather-img/icons/forecast-icons/light-rain.svg';
import rain from '../../static/weather-img/icons/forecast-icons/rain.svg';
import moderateRain from '../../static/weather-img/icons/forecast-icons/moderate-rain.svg';
import heavyRain from '../../static/weather-img/icons/forecast-icons/heavy-rain.svg';
import lightSnow from '../../static/weather-img/icons/forecast-icons/light-snow.svg';
import snow from '../../static/weather-img/icons/forecast-icons/snow.svg';
import moderateSnow from '../../static/weather-img/icons/forecast-icons/moderate-snow.svg';
import thunder from '../../static/weather-img/icons/forecast-icons/thunder.svg';

import sunLight from '../../static/weather-img/icons/forecast-icons/sun-light.svg';
import cloudsLight from '../../static/weather-img/icons/forecast-icons/clouds-light.svg';
import sunnyСloudsLight from '../../static/weather-img/icons/forecast-icons/sunny-clouds-light.svg';
import lightRainLight from '../../static/weather-img/icons/forecast-icons/light-rain-light.svg';
import rainLight from '../../static/weather-img/icons/forecast-icons/rain-light.svg';
import moderateRainLight from '../../static/weather-img/icons/forecast-icons/moderate-rain-light.svg';
import heavyRainLight from '../../static/weather-img/icons/forecast-icons/heavy-rain-light.svg';
import lightSnowLight from '../../static/weather-img/icons/forecast-icons/light-snow-light.svg';
import snowLight from '../../static/weather-img/icons/forecast-icons/snow-light.svg';
import moderateSnowLight from '../../static/weather-img/icons/forecast-icons/moderate-snow-light.svg';
import thunderLight from '../../static/weather-img/icons/forecast-icons/thunder-light.svg';

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
  return shinyIcon;
};

export default (type) => {
  switch (type) {
    case 'clear sky':
      return checkTheme(sun, sunLight);
    case 'broken clouds':
      return checkTheme(clouds, cloudsLight);
    case 'overcast clouds':
      return checkTheme(clouds, cloudsLight);
    case 'scattered clouds':
      return checkTheme(sunnyСlouds, sunnyСloudsLight);
    case 'few clouds':
      return checkTheme(sunnyСlouds, sunnyСloudsLight);
    case 'light rain':
      return checkTheme(lightRain, lightRainLight);
    case 'rain':
      return checkTheme(rain, rainLight);
    case 'moderate rain':
      return checkTheme(moderateRain, moderateRainLight);
    case 'heavy rain':
      return checkTheme(heavyRain, heavyRainLight);
    case 'shower':
      return checkTheme(heavyRain, heavyRainLight);
    case 'light snow':
      return checkTheme(lightSnow, lightSnowLight);
    case 'snow':
      return checkTheme(snow, snowLight);
    case 'moderate snow':
      return checkTheme(moderateSnow, moderateSnowLight);
    case 'heavy snow':
      return checkTheme(moderateSnow, moderateSnowLight);
    case 'thunder':
      return checkTheme(thunder, thunderLight);
    default:
      return shinyIcon;
  }
};