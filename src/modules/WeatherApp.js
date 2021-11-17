import Skyact from './Skyact';
import MyTitle from './MyTitle';

export default class WeatherApp extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement(MyTitle, {
      message: this.props.message,
    }, Skyact.createElement('MyTitle', null, 'ohhh'));
  }
}