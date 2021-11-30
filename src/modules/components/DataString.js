/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import Humidity from './Humidity';
import Wind from './Wind';

import pressureIcon from '../../static/weather-img/icons/pressure.svg';

export default class DataString extends Skyact.SkyactComponent {
  render() {
    const {
      currentHumidity,
      currentPressure,
      currentWind,
    } = this.props;

    return Skyact.createElement('div', {
      className: 'data-string',
    }, [
      Skyact.createElement(Humidity, {
        humidity: `${currentHumidity}`,
      }),
      Skyact.createElement('div', null, [
        Skyact.createElement('img', {
          src: pressureIcon,
        }),
        Skyact.createElement('span', null, `${currentPressure}`),
      ]),
      Skyact.createElement(Wind, {
        wind: `${currentWind}`,
      }),
    ]);
  }
}