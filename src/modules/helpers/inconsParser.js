import sunIcon from '../../static/weather-img/icons/sun.svg';
import cloudyIcon from '../../static/weather-img/icons/cloudy.svg';
import shinyIcon from '../../static/weather-img/icons/shiny.svg';
import cloudsIcon from '../../static/weather-img/icons/clouds.svg';

export default (type) => {
  switch (type) {
    case 'broken clouds':
      return cloudsIcon;
    case 'overcast clouds':
      return cloudyIcon;
    case 'scattered clouds':
      return cloudyIcon;
    case 'snow':
      return shinyIcon;
    case 'light rain':
      return sunIcon;
    default:
      return cloudsIcon;
  }
};