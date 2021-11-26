import Router from '.';
import MainScreen from '../pages/MainScreen';
import CitySaved from '../pages/CitySaved';
import Menu from '../pages/Menu';

const router = new Router({
  mode: 'hash',
});
router.init();

export const routes = {
  mainScreen: 'main-screen',
  citySaved: 'city-saved',
  menu: 'menu',
};

export const switcher = [{
  path: routes.mainScreen,
  Component: MainScreen,
}, {
  path: routes.citySaved,
  Component: CitySaved,
}, {
  path: routes.menu,
  Component: Menu,
}];

export default router;