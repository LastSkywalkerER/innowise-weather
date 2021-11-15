import Skyact from './Skyact/Skyact';

export default class WeatherApp extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('h1', null, this.props.message);
  }
}