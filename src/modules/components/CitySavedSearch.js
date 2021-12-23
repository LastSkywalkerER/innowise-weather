import Skyact from 'Skyact';
import CityListItem from './CityListItem';
import { setInput, setInputValue, editCities } from '../skyax/actions';
import store from '../skyax/store';
import isArraysEqual from '../helpers/isArrayEqual';

import search from '../../static/weather-img/icons/search.svg';
import edit from '../../static/weather-img/icons/edit.svg';
import editActive from '../../static/weather-img/icons/edit-active.svg';

export default class CitySavedSearch extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.state = {
      cityList: store.getState().cityList,
    };
  }

  componentDidMount() {
    this.subscription = (state) => {
      if (
        !isArraysEqual(state.cityList, this.state.cityList) &&
        state.cityList.length
      ) {
        this.setState({
          cityList: state.cityList,
        });
      }
    };

    store.subscribe(this.subscription);
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscription);
  }

  render() {
    return Skyact.createElement(
      'div',
      {
        className: 'search-block',
      },
      [
        Skyact.createElement('img', {
          src: search,
          onClick: () => this.props.addCity(),
        }),
        Skyact.createElement('input', {
          placeHolder: 'Search',
          list: 'citiesList',
          onInput: (event) => {
            store.dispatch(setInputValue(event.target.value));
            this.props.addCity();
          },
          // eslint-disable-next-line no-return-assign
          getRef: (element) => {
            store.dispatch(setInput(element));
          },
        }),
        Skyact.createElement(
          'datalist',
          {
            id: 'citiesList',
          },
          this.state.cityList.map((city) =>
            Skyact.createElement(CityListItem, city),
          ),
        ),
        Skyact.createElement('img', {
          src: this.props.editCities ? editActive : edit,
          onClick: () => {
            store.dispatch(editCities(!this.props.editCities));
          },
        }),
      ],
    );
  }
}
