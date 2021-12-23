/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';

export default class HoursForecastData extends Skyact.SkyactComponent {
  render() {
    const { time, icon, temp } = this.props;

    return Skyact.createElement('div', null, [
      Skyact.createElement('span', null, [time]),
      Skyact.createElement('img', {
        src: icon,
      }),
      Skyact.createElement('span', null, [temp]),
    ]);
  }
}
