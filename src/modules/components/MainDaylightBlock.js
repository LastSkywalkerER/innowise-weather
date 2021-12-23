import Skyact from 'Skyact';

import moonImage from '../../static/weather-img/moon.png';
import daylightLineImage from '../../static/weather-img/daylight-line.png';

export default class MainDaylightBlock extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement(
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
            Skyact.createElement('span', null, `${this.props.sunrise}`),
          ],
        ),
        Skyact.createElement(
          'div',
          {
            className: 'sunset',
          },
          [
            Skyact.createElement('span', null, `${this.props.sunset}`),
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
    );
  }
}
