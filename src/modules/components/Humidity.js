/* eslint-disable class-methods-use-this */
import humidityIcon from '../../static/weather-img/icons/humidity.svg';
import Skyact from 'Skyact';

export default class cityBlock extends Skyact.SkyactComponent {
  render() {
    const { humidity } = this.props;

    return Skyact.createElement('div', null, [
      Skyact.createElement('img', {
        src: humidityIcon,
      }),
      Skyact.createElement('span', null, humidity),
    ]);
  }
}
