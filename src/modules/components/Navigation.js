/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import mainScreen from '../../static/weather-img/icons/main-screen.svg';
import mainScreenActive from '../../static/weather-img/icons/main-screen-active.svg';
import map from '../../static/weather-img/icons/map.svg';
import citySaved from '../../static/weather-img/icons/city-saved.svg';
import citySavedActive from '../../static/weather-img/icons/city-saved-active.svg';
import menu from '../../static/weather-img/icons/menu.svg';
import menuActive from '../../static/weather-img/icons/menu-active.svg';
import store from '../Skyax/store';
import {
  pages,
} from '../Skyax/constants';
import {
  setMainScreen,
  setCitySaved,
  setMenu,
} from '../Skyax/actions';

import '../../styles/navigation.sass';

export default class Navigation extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: store.getState().page,
    };
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setState({
        activePage: state.page,
      });
    });
  }

  render() {
    const mainScreenIcon = this.state.activePage !== pages.mainScreen ?
      mainScreen : mainScreenActive;
    const citySavedIcon = this.state.activePage !== pages.citySaved ?
      citySaved : citySavedActive;
    const menuIcon = this.state.activePage !== pages.menu ?
      menu : menuActive;
    return Skyact.createElement('div', {
      className: 'navigation',
    }, [Skyact.createElement('img', {
        src: mainScreenIcon,
        onClick: () => store.dispatch(setMainScreen()),
      }),
      Skyact.createElement('img', {
        src: map,
      }),
      Skyact.createElement('img', {
        src: citySavedIcon,
        onClick: () => store.dispatch(setCitySaved()),
      }),
      Skyact.createElement('img', {
        src: menuIcon,
        onClick: () => store.dispatch(setMenu()),
      }),
    ]);
  }
}