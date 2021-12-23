/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';

export default class ClearSky extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', null, [
      Skyact.createElement('div', {
        className: 'sun animation-sun',
      }),
    ]);
  }
}
