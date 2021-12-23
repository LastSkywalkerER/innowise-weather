/* eslint-disable class-methods-use-this */
import windIcon from '../../static/weather-img/icons/wind.svg';
import Skyact from 'Skyact';

export default class Wind extends Skyact.SkyactComponent {
  render() {
    const { wind } = this.props;

    return Skyact.createElement('div', null, [
      Skyact.createElement('img', {
        src: windIcon,
      }),
      Skyact.createElement('span', null, wind),
    ]);
  }
}
