/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';

export default class Settings extends Skyact.SkyactComponent {
  render() {
    const {
      title,
      options,
    } = this.props;
    return Skyact.createElement('div', {
      className: 'settings-item',
    }, [
      Skyact.createElement('span', {
        className: 'settings-title',
      }, title),
      Skyact.createElement('select', {
        className: 'settings-select',
      }, options.map((option) => Skyact.createElement('option', {
        value: option.name,
      }, option.name))),
    ]);
  }
}