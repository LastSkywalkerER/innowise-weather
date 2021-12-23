/* eslint-disable indent */
import Skyact from 'Skyact';
import DaysForecastData from '../components/DaysForecastData';
import DataString from '../components/DataString';
import store from '../skyax/store';
import { upLoading } from '../skyax/actions';
import { WEATHER_LOADING, FORECAST_LOADING } from '../skyax/constants';
import MainWeather from '../helpers/MainWeather';
import Loader from '../components/Loader';
import mainInconsParser from '../helpers/mainInconsParser';
import MainScreenData from '../components/MainScreenData';
import MainDaylightBlock from '../components/MainDaylightBlock';
import HoursForecastBlock from '../components/HoursForecastBlock';

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
            Skyact.createElement(MainScreenData, {
              currentCity: this.state.currentCity,
              temp: this.state.currentWeather.mainData.temp,
              condition: this.state.currentWeather.mainData.condition,
            }),
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
            Skyact.createElement(MainDaylightBlock, {
              sunrise: this.state.currentWeather.mainData.sunrise,
              sunset: this.state.currentWeather.mainData.sunset,
            }),
            Skyact.createElement(HoursForecastBlock, {
              [FORECAST_LOADING]: this.state[FORECAST_LOADING],
              hourlyForecast: this.state.currentWeather.hourlyForecast,
            }),
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
