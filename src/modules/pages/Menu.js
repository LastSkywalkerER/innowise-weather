/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
// Skyact.createElement('', null, [])

import '../../styles/main-screen.sass';

export default class Menu extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', null, ['menu']);
  }
}