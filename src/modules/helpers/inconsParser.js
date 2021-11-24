import sunIcon from '../../static/weather-img/icons/sun.svg';
import cloudyIcon from '../../static/weather-img/icons/cloudy.svg';
import shinyIcon from '../../static/weather-img/icons/shiny.svg';
import cloudsIcon from '../../static/weather-img/icons/clouds.svg';

export default function (type) {
  switch (type) {
    case 'broken clouds':
      return cloudyIcon;
    case 'overcast clouds':
      return shinyIcon;
    case 'snow':
      return sunIcon;
    case 'light rain':
      return sunIcon;
    default:
      return cloudsIcon;
  }
}