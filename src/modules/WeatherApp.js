/* eslint-disable class-methods-use-this */
import Skyact from './Skyact';
import MainScreen from './pages/MainScreen';
import CitySaved from './pages/CitySaved';
import Menu from './pages/Menu';
import Navigation from './components/Navigation';
import store from './Skyax/store';
import {
  pages,
} from './Skyax/constants';

export default class WeatherApp extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main-screen',
    };
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setState({
        page: state.page,
      });
    });
  }

  render() {
    let Page = MainScreen;

    switch (this.state.page) {
      case pages.mainScreen:
        Page = MainScreen;
        break;
      case pages.citySaved:
        Page = CitySaved;
        break;
      case pages.menu:
        Page = Menu;
        break;
      default:
        Page = MainScreen;
        break;
    }
    return Skyact.createElement('div', null,
      [
        Skyact.createElement('a', {
          className: 'designer-bio',
          href: 'https://linktr.ee/adinyanuar',
        }, 'Designed by Adin Yanuar'),
        Skyact.createElement(Page, null),
        Skyact.createElement(Navigation, null),
      ]);
  }
}