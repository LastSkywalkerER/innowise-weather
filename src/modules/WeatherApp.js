/* eslint-disable class-methods-use-this */
import Skyact from './Skyact';
import Navigation from './components/Navigation';
import routes from './router/routes';
import switcher from './router/switcher';
import router from './router/routerInitial';
import geolocation from './geolocation';

export default class WeatherApp extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: router.getCurrentPath(),
    };
  }

  componentDidMount() {
    this.subscriber = (path) => {
      if (path !== this.state.page) {
        this.setState({
          page: path,
        });
      }
    };

    router.subscribe(this.subscriber);
  }

  componentWillUnmount() {
    router.unsubscribe(this.subscriber);
  }

  render() {
    return Skyact.createElement('div', null,
      [
        Skyact.createElement('a', {
          className: 'designer-bio',
          href: 'https://linktr.ee/adinyanuar',
        }, 'Designed by Adin Yanuar'),
        Skyact.createElement(router.switchComponent(switcher, routes.mainScreen), null),
        Skyact.createElement(Navigation, null),
      ]);
  }
}