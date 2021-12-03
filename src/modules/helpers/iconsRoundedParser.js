// import shinyRounded from '../../static/weather-img/icons/shiny-rounded.svg';
// import snowRounded from '../../static/weather-img/icons/snow-dounded.svg';
// import cloudyRounded from '../../static/weather-img/icons/cloudy-rounded.svg';
// import rainRounded from '../../static/weather-img/icons/rain-rounded.svg';
// import cloudsRounded from '../../static/weather-img/icons/clouds-rounded.svg';

import Blizzard from '../components/icons-rounded/Blizzard';
import BlowingSnow from '../components/icons-rounded/BlowingSnow';
import Clear from '../components/icons-rounded/Clear';
import Cloudy from '../components/icons-rounded/Cloudy';
import Fog from '../components/icons-rounded/Fog';
import FreezingFog from '../components/icons-rounded/FreezingFog';
import HeavyRainAtTimes from '../components/icons-rounded/HeavyRainAtTimes';
import LightDrizzle from '../components/icons-rounded/LightDrizzle';
import LightRain from '../components/icons-rounded/LightRain';
import Mist from '../components/icons-rounded/Mist';
import Overcast from '../components/icons-rounded/Overcast';
import PartlyCloudy from '../components/icons-rounded/PartlyCloudy';
import PatchyFreezingDrizzlePossible from '../components/icons-rounded/PatchyFreezingDrizzlePossible';
import PatchyLightRain from '../components/icons-rounded/PatchyLightRain';
import PatchyRainPossible from '../components/icons-rounded/PatchyRainPossible';
import PatchySleetPossible from '../components/icons-rounded/PatchySleetPossible';
import PatchySnowPossible from '../components/icons-rounded/PatchySnowPossible';
import Sunny from '../components/icons-rounded/Sunny';
import ThunderyOutbreaksPossible from '../components/icons-rounded/ThunderyOutbreaksPossible';
import HeavyRain from '../components/icons-rounded/HeavyRain';
import LightFreezingRain from '../components/icons-rounded/LightFreezingRain';
import LightSleet from '../components/icons-rounded/LightSleet';
import LightSnow from '../components/icons-rounded/LightSnow';
import IcePellets from '../components/icons-rounded/IcePellets';
import LightRainShower from '../components/icons-rounded/LightRainShower';
import ModerateOrHeavyRainShower from '../components/icons-rounded/ModerateOrHeavyRainShower';
import TorrentialRainShower from '../components/icons-rounded/TorrentialRainShower';
import ModerateOrHeavyRainWithThunder from '../components/icons-rounded/ModerateOrHeavyRainWithThunder';

export default (type) => {
  switch (type) {
    case 'Sunny':
      return Sunny;
    case 'Clear':
      return Clear;
    case 'Partly cloudy':
      return PartlyCloudy;
    case 'Cloudy':
      return Cloudy;
    case 'Overcast':
      return Overcast;
    case 'Mist':
      return Mist;
    case 'Patchy rain possible':
      return PatchyRainPossible;
    case 'Patchy snow possible':
      return PatchySnowPossible;
    case 'Patchy sleet possible':
      return PatchySleetPossible;
    case 'Patchy freezing drizzle possible':
      return PatchyFreezingDrizzlePossible;
    case 'Thundery outbreaks possible':
      return ThunderyOutbreaksPossible;
    case 'Blowing snow':
      return BlowingSnow;
    case 'Blizzard':
      return Blizzard;
    case 'Fog':
      return Fog;
    case 'Freezing fog':
      return FreezingFog;
    case 'Patchy light drizzle':
      return LightDrizzle;
    case 'Light drizzle':
      return LightDrizzle;
    case 'Freezing drizzle':
      return LightDrizzle;
    case 'Heavy freezing drizzle':
      return LightDrizzle;
    case 'Patchy light rain':
      return PatchyLightRain;
    case 'Light rain':
      return LightRain;
    case 'Moderate rain at times':
      return PatchyLightRain;
    case 'Moderate rain':
      return LightRain;
    case 'Heavy rain at times':
      return HeavyRainAtTimes;
    case 'Heavy rain':
      return HeavyRain;
    case 'Light freezing rain':
      return LightFreezingRain;
    case 'Moderate or heavy freezing rain':
      return LightFreezingRain;
    case 'Light sleet':
      return LightSleet;
    case 'Moderate or heavy sleet':
      return LightSleet;
    case 'Patchy light snow':
      return PatchySnowPossible;
    case 'Light snow':
      return LightSnow;
    case 'Patchy moderate snow':
      return PatchySnowPossible;
    case 'Moderate snow':
      return LightSnow;
    case 'Patchy heavy snow':
      return PatchySnowPossible;
    case 'Heavy snow':
      return LightSnow;
    case 'Ice pellets':
      return IcePellets;
    case 'Light rain shower':
      return LightRainShower;
    case 'Moderate or heavy rain shower':
      return ModerateOrHeavyRainShower;
    case 'Torrential rain shower':
      return TorrentialRainShower;
    case 'Light sleet showers':
      return PatchySleetPossible;
    case 'Moderate or heavy sleet showers':
      return PatchySleetPossible;
    case 'Light snow showers':
      return PatchySnowPossible;
    case 'Moderate or heavy snow showers':
      return PatchySnowPossible;
    case 'Light showers of ice pellets':
      return IcePellets;
    case 'Moderate or heavy showers of ice pellets':
      return IcePellets;
    case 'Patchy light rain with thunder':
      return ThunderyOutbreaksPossible;
    case 'Moderate or heavy rain with thunder':
      return ModerateOrHeavyRainWithThunder;
    case 'Patchy light snow with thunder':
      return ThunderyOutbreaksPossible;
    case 'Moderate or heavy snow with thunder':
      return ModerateOrHeavyRainWithThunder;
    default:
      return null;
  }
};