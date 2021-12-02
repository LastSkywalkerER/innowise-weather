/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import store from '../Skyax/store';
import {
  ERROR,
} from '../Skyax/constants';
import {
  setError
} from '../Skyax/actions';

import '../../styles/error-popup.sass';

export default class ErrorPopup extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: store.getState().error,
    };
  }

  componentDidMount() {
    this.subscription = (state, type) => {
      if (type === ERROR) {
        this.setState({
          error: state.error,
        });
        if (state.error) {
          setTimeout(() => {
            store.dispatch(setError(undefined));
          }, 5000);
        }
      }
    };

    store.subscribe(this.subscription);
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscription);
  }

  render() {
    const errorText = this.state.error ? this.state.error : '@';
    const errorClass = this.state.error ? 'error-popup active' : 'error-popup';

    return Skyact.createElement('div', {
      className: errorClass,
    }, [Skyact.createElement('p', {
      className: 'error-text',
    }, errorText)]);
  }
}