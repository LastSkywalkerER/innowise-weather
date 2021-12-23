import Skyact from 'Skyact';

export default class MainScreenData extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement(
      'div',
      {
        className: 'main-data',
      },
      [
        Skyact.createElement('span', null, [`${this.props.currentCity}`]),
        Skyact.createElement('h1', null, [`${this.props.temp}`]),
        Skyact.createElement(
          'span',
          {
            className: 'weather-phenomenon',
          },
          [`${this.props.condition}`],
        ),
      ],
    );
  }
}
