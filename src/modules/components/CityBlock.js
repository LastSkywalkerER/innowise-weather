/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import Humidity from './Humidity';
import Wind from './Wind';
import store from '../Skyax/store';
import {
  removeCitySaved,
  setCurrentCity,
} from '../Skyax/actions';
import router from '../router/routerInitial';
import routes from '../router/routes';

export default class cityBlock extends Skyact.SkyactComponent {
  render() {
    const {
      city,
      country,
      temp,
      Icon,
      humidity,
      wind,
      index,
      editable,
      updater,
    } = this.props;

    return Skyact.createElement('div', {
      className: `city-block${editable ? ' editable' : ''}`,
      onClick: () => {
        if (editable) {
          store.dispatch(removeCitySaved(index));
          updater();
        } else {
          store.dispatch(setCurrentCity(city));
          router.navigate(routes.mainScreen);
        }
      },
    }, [
      Skyact.createElement('div', null, [
        Skyact.createElement('h3', null, [temp]),
        Skyact.createElement(Icon, null),
      ]),
      Skyact.createElement('div', null, [
        Skyact.createElement('span', null, [city]),
        Skyact.createElement('span', null, [country]),
      ]),
      Skyact.createElement('div', null, [
        Skyact.createElement(Humidity, {
          humidity,
        }),
        Skyact.createElement(Wind, {
          wind,
        }),
      ]),
    ]);
  }
}