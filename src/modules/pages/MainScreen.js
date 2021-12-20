/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import HoursForecastData from '../components/HoursForecastData';
import DaysForecastData from '../components/DaysForecastData';
import DataString from '../components/DataString';
import store from '../Skyax/store';
import { upLoading } from '../Skyax/actions';
import { WEATHER_LOADING, FORECAST_LOADING } from '../Skyax/constants';
import MainWeather from '../helpers/MainWeather';
import Loader from '../components/Loader';
import mainInconsParser from '../helpers/mainInconsParser';

import moonImage from '../../static/weather-img/moon.png';
import daylightLineImage from '../../static/weather-img/daylight-line.png';

// Skyact.createElement('', null, [])

import '../../styles/main-screen.sass';

export default class MainScreen extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      weatherLoading: true,
      forecastLoading: true,
      currentWeather: new MainWeather(),
      currentCity: store.getState().currentCity,
    };

    store.dispatch(upLoading(WEATHER_LOADING));
    store.dispatch(upLoading(FORECAST_LOADING));
  }

  componentDidMount() {
    this.state.currentWeather.getMainData();
    this.state.currentWeather.getForecast();

    this.subscribtion = (state) => {
      if (
        this.state[WEATHER_LOADING] !== state[WEATHER_LOADING] &&
        state[WEATHER_LOADING] === false
      ) {
        this.setState({
          [WEATHER_LOADING]: state[WEATHER_LOADING],
        });
      }
      if (
        this.state[FORECAST_LOADING] !== state[FORECAST_LOADING] &&
        state[FORECAST_LOADING] === false
      ) {
        this.setState({
          [FORECAST_LOADING]: state[FORECAST_LOADING],
        });
      }
      if (this.state.currentCity !== state.currentCity) {
        this.state.currentWeather.getMainData();
        this.state.currentWeather.getForecast();
        this.setState({
          currentCity: state.currentCity,
        });
      }
    };

    store.subscribe(this.subscribtion);
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscribtion);
  }

  render() {
    let mainData = [Skyact.createElement(Loader, null, [])];
    if (!this.state[WEATHER_LOADING]) {
      mainData = [
        Skyact.createElement(
          'div',
          {
            className: 'container',
          },
          [
            Skyact.createElement(
              'div',
              {
                className: 'main-data',
              },
              [
                Skyact.createElement('span', null, [
                  `${this.state.currentCity}`,
                ]),
                Skyact.createElement('h1', null, [
                  `${this.state.currentWeather.mainData.temp}`,
                ]),
                Skyact.createElement(
                  'span',
                  {
                    className: 'weather-phenomenon',
                  },
                  [`${this.state.currentWeather.mainData.condition}`],
                ),
              ],
            ),
            Skyact.createElement(
              'div',
              {
                className: 'main-weather-image',
              },
              [
                Skyact.createElement(
                  mainInconsParser(
                    this.state.currentWeather.mainData.condition,
                  ),
                  null,
                ),
              ],
            ),
            Skyact.createElement(DataString, {
              currentHumidity: this.state.currentWeather.mainData.humidity,
              currentPressure: this.state.currentWeather.mainData.pressure,
              currentWind: this.state.currentWeather.mainData.wind,
            }),
            Skyact.createElement(
              'div',
              {
                className: 'daylight-block',
              },
              [
                Skyact.createElement(
                  'div',
                  {
                    className: 'sunrise',
                  },
                  [
                    Skyact.createElement('div', {
                      className: 'sun',
                    }),
                    Skyact.createElement(
                      'span',
                      null,
                      `${this.state.currentWeather.mainData.sunrise}`,
                    ),
                  ],
                ),
                Skyact.createElement(
                  'div',
                  {
                    className: 'sunset',
                  },
                  [
                    Skyact.createElement(
                      'span',
                      null,
                      `${this.state.currentWeather.mainData.sunset}`,
                    ),
                    Skyact.createElement('img', {
                      src: moonImage,
                    }),
                  ],
                ),
                Skyact.createElement('img', {
                  className: 'daylight-line',
                  src: daylightLineImage,
                }),
              ],
            ),
            Skyact.createElement(
              'div',
              {
                className: 'hours-forecast-block',
              },
              [
                Skyact.createElement('h3', null, ['Today']),
                Skyact.createElement(
                  'div',
                  {
                    className: 'hours-forecast-wrapper',
                  },
                  this.state[FORECAST_LOADING]
                    ? [Skyact.createElement(Loader, null, [])]
                    : this.state.currentWeather.hourlyForecast.map((forecast) =>
                        Skyact.createElement(HoursForecastData, forecast),
                      ),
                ),
              ],
            ),
            Skyact.createElement(
              'div',
              {
                className: 'days-forecast-wrapper',
              },
              this.state[FORECAST_LOADING]
                ? [Skyact.createElement(Loader, null, [])]
                : this.state.currentWeather.daylyForecast.map((forecast) =>
                    Skyact.createElement(DaysForecastData, forecast),
                  ),
            ),
          ],
        ),
      ];
    }

    return Skyact.createElement(
      'div',
      {
        className: 'main-screen',
      },
      mainData,
    );
  }
}
