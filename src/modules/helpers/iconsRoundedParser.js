import shinyRounded from '../../static/weather-img/icons/shiny-rounded.svg';
import snowRounded from '../../static/weather-img/icons/snow-dounded.svg';
import cloudyRounded from '../../static/weather-img/icons/cloudy-rounded.svg';
import rainRounded from '../../static/weather-img/icons/rain-rounded.svg';
import cloudsRounded from '../../static/weather-img/icons/clouds-rounded.svg';

export default (type) => {
  switch (type) {
    case 'Clouds':
      return cloudsRounded;
    case 'Overcast':
      return cloudyRounded;
    case 'Snow':
      return snowRounded;
    case 'Rain':
      return rainRounded;
    case 'Sun':
      return shinyRounded;
    default:
      return shinyRounded;
  }
}