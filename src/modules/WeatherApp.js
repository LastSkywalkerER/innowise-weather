/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';
import Navigation from './components/Navigation';
import ErrorPopup from './components/ErrorPopup';
import routes from './router/routes';
import switcher from './router/switcher';
import router from './router/routerInitial';
import ChangeTheme from './helpers/ChangeTheme';
import darkTheme from './helpers/themes/darkTheme';
import lightTheme from './helpers/themes/lightTheme';
import './geolocation';

import '../styles/animations.sass';

export default class WeatherApp extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: router.getCurrentPath(),
    };

    this.themeChenger = new ChangeTheme();
    this.themeChenger.addTheme('Dark', darkTheme);
    this.themeChenger.addTheme('Light', lightTheme);
    this.themeChenger.start();
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
    return Skyact.createElement('div', null, [
      Skyact.createElement(
        'a',
        {
          className: 'designer-bio',
          href: 'https://linktr.ee/adinyanuar',
        },
        'Designed by Adin Yanuar',
      ),
      Skyact.createElement(
        router.switchComponent(switcher, routes.mainScreen),
        null,
      ),
      Skyact.createElement(Navigation, null),
      Skyact.createElement(ErrorPopup, null),
    ]);
  }
}
