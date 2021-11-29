import Router from '../router';
import {
  routes,
  switcher,
} from '../router/routes';

import MainScreen from '../pages/MainScreen';
import CitySaved from '../pages/CitySaved';
import Menu from '../pages/Menu';

import RouterTester from './RouterTester';

const ruoterTester = new RouterTester(Router, routes, switcher);

ruoterTester.fillTestValues('', MainScreen);
ruoterTester.fillTestValues(routes.mainScreen, MainScreen);
ruoterTester.fillTestValues(routes.citySaved, CitySaved);
ruoterTester.fillTestValues(routes.menu, Menu);
ruoterTester.fillTestValues('dfsdnfl', MainScreen);

ruoterTester.test();
ruoterTester.test({
  mode: 'hash',
});