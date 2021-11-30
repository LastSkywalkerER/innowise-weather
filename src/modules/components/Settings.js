/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import store from '../Skyax/store';
import {
  changeSettings,
} from '../Skyax/actions';

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
        onChange: (event) => {
          store.dispatch(changeSettings({
            [title]: event.target.value,
          }));
        },
      }, options.map((option) => {
        const optionProps = store.getState().settings[title] === option.name ? {
          value: option.name,
          selected: true,
        } : {
          value: option.name,
        };

        return Skyact.createElement('option', optionProps, option.name);
      })),
    ]);
  }
}