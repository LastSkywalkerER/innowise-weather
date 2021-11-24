/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import Humidity from './Humidity';
import Wind from './Wind';

export default class cityBlock extends Skyact.SkyactComponent {
  render() {
    const {
      city,
      country,
      temp,
      icon,
      humidity,
      wind,
    } = this.props;

    return Skyact.createElement('div', {
      className: 'city-block',
    }, [
      Skyact.createElement('div', null, [
        Skyact.createElement('h3', null, [temp]),
        Skyact.createElement('img', {
          src: icon,
        }),
      ]),
      Skyact.createElement('div', null, [
        Skyact.createElement('span', null, [city]),
        Skyact.createElement('span', null, [country]),
      ]),
      Skyact.createElement('div', null, [
        Skyact.createElement(Humidity, {
          humidity,
        }),
        Skyact.createElement(Wind, {
          wind,
        }),
      ]),
    ]);
  }
}