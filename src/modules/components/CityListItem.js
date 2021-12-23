/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';

import '../../styles/loader.sass';

export default class CityListItem extends Skyact.SkyactComponent {
  render() {
    const { name, addCity } = this.props;
    return Skyact.createElement('option', {
      value: `${name}`,
      onClick: () => {
        addCity();
      },
    });
  }
}
