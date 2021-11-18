/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';

export default class DaysForecastData extends Skyact.SkyactComponent {
  render() {
    const {
      day,
      icon,
      temp1,
      temp2,
    } = this.props;

    return Skyact.createElement('div', null, [
      Skyact.createElement('span', null, [day]),
      Skyact.createElement('img', {
        src: icon,
      }),
      Skyact.createElement('div', null, [
        Skyact.createElement('span', null, [temp1]),
        Skyact.createElement('span', null, [temp2]),
      ]),
    ]);
  }
}