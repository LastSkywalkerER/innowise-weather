/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import CityBlock from '../components/CityBlock';
import CityListItem from '../components/CityListItem';
import CitySearch from '../helpers/CitySearch';
import {} from '../Skyax/constants';
import store from '../Skyax/store';
import {
  setInput,
  setInputValue,
  editCities,
} from '../Skyax/actions';

import search from '../../static/weather-img/icons/search.svg';
import edit from '../../static/weather-img/icons/edit.svg';
import editActive from '../../static/weather-img/icons/edit-active.svg';
// Skyact.createElement('', null, [])

import '../../styles/city-saved.sass';

export default class CitySaved extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.citiesData = new CitySearch();
    this.state = {
      cityList: store.getState().cityList,
      citySaved: store.getState().citySaved,
      editCities: store.getState().editCities,
    };
  }

  isArraysEqual(array1, array2) {
    return !array1.find((item, i) => array1[i] !== array2[i]) && array1.length === array2.length;
  }

  componentDidMount() {
    this.subscription = (state) => {
      if (!this.isArraysEqual(state.cityList, this.state.cityList) && state.cityList.length) {
        this.setState({
          cityList: state.cityList,
        });
      }
      if (!this.isArraysEqual(state.citySaved, this.state.citySaved)) {
        this.setState({
          citySaved: state.citySaved,
        });
      }
      if (state.editCities !== this.setState.editCities) {
        this.setState({
          editCities: state.editCities,
        });
      }
    };

    store.subscribe(this.subscription);
    this.citiesData.getCitiesList();
    this.citiesData.downLoadCitiesData();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    store.unsubscribe(this.subscription);
    store.dispatch(editCities(false));
  }

  render() {
    return Skyact.createElement('div', {
      className: 'city-saved container',
    }, [Skyact.createElement('div', {
        className: 'search-block',
      }, [
        Skyact.createElement('img', {
          src: search,
          onClick: () => this.citiesData.addCity(),
        }),
        Skyact.createElement('input', {
          placeHolder: 'Search',
          list: 'citiesList',
          onInput: (event) => {
            store.dispatch(setInputValue(event.target.value));
          },
          // eslint-disable-next-line no-return-assign
          getRef: (element) => {
            store.dispatch(setInput(element));
          },
        }),
        Skyact.createElement('datalist', {
            id: 'citiesList',
          },
          this.state.cityList.map((city) => Skyact.createElement(CityListItem, city))),
        Skyact.createElement('img', {
          src: this.state.editCities ? editActive : edit,
          onClick: () => {
            store.dispatch(editCities(!this.state.editCities));
          },
        }),
      ]),
      Skyact.createElement('div', {
          className: 'cities-wrapper',
        }, this.state.citySaved.length === this.citiesData.dataList.length &&
        this.citiesData.dataList.length ? this.state.citySaved.map(
          // eslint-disable-next-line function-paren-newline
          (city, i) => Skyact.createElement(CityBlock, {
            ...this.citiesData.dataList[i],
            index: i,
            editable: this.state.editCities,
            updater: this.citiesData.downLoadCitiesData
              .bind(this.citiesData, true),
          })) : []),
    ]);
  }
}