import Skyact from 'Skyact';
import HoursForecastData from './HoursForecastData';
import Loader from './Loader';
import { FORECAST_LOADING } from '../skyax/constants';

export default class HoursForecastBlock extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement(
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
          this.props[FORECAST_LOADING]
            ? [Skyact.createElement(Loader, null, [])]
            : this.props.hourlyForecast.map((forecast) =>
                Skyact.createElement(HoursForecastData, forecast),
              ),
        ),
      ],
    );
  }
}
