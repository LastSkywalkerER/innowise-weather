/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';

import '../../styles/loader.sass';

export default class Loader extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('span', {
      className: 'loader',
    });
  }
}