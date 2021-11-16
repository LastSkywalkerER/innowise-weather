import Skyact from './Skyact';
import MyTitle from './MyTitle';

export default class WeatherApp extends Skyact.SkyactComponent {
  render() {
    if (this.props.asTitle) {
      return Skyact.createElement(MyTitle, {
        message: this.props.message,
      });
    }
    return Skyact.createElement('p', null, this.props.message);
  }
}