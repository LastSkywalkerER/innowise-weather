import MainScreen from '../pages/MainScreen';
import CitySaved from '../pages/CitySaved';
import Menu from '../pages/Menu';
import routes from './routes';

export default [{
  path: routes.mainScreen,
  Component: MainScreen,
}, {
  path: routes.citySaved,
  Component: CitySaved,
}, {
  path: routes.menu,
  Component: Menu,
}];