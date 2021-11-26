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
import router, {
  routes,
} from '../router/routes';

import '../../styles/navigation.sass';

export default class Navigation extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: router.getCurrentPath(),
    };
  }

  componentDidMount() {
    this.subscribtion = (path) => {
      if (this.state.activePage !== path) {
        this.setState({
          activePage: path,
        });
      }
    };

    router.subscribe(this.subscribtion);
  }

  componentWillUnmount() {
    router.unsubscribe(this.subscribtion);
  }

  render() {
    const mainScreenIcon = this.state.activePage !== routes.mainScreen ?
      mainScreen : mainScreenActive;
    const citySavedIcon = this.state.activePage !== routes.citySaved ?
      citySaved : citySavedActive;
    const menuIcon = this.state.activePage !== routes.menu ?
      menu : menuActive;
    return Skyact.createElement('div', {
      className: 'navigation',
    }, [Skyact.createElement('img', {
        src: mainScreenIcon,
        onClick: () => {
          router.navigate(routes.mainScreen);
        },
      }),
      Skyact.createElement('img', {
        src: map,
      }),
      Skyact.createElement('img', {
        src: citySavedIcon,
        onClick: () => {
          router.navigate(routes.citySaved);
        },
      }),
      Skyact.createElement('img', {
        src: menuIcon,
        onClick: () => {
          router.navigate(routes.menu);
        },
      }),
    ]);
  }
}