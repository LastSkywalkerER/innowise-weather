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
} from '../Skyax/actions';

import search from '../../static/weather-img/icons/search.svg';
import edit from '../../static/weather-img/icons/edit.svg';
// Skyact.createElement('', null, [])

import '../../styles/city-saved.sass';

export default class CitySaved extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.citiesData = new CitySearch();
    this.state = {
      cityList: [],
      citySaved: [],
    };
  }

  isArraysEqual(array1, array2) {
    return !array1.find((item, i) => array1[i] !== array2[i]);
  }

  componentDidMount() {
    this.subscription = (state) => {
      if (!this.isArraysEqual(state.cityList, this.state.cityList) && state.cityList.length) {
        this.setState({
          cityList: state.cityList,
        });
      }
      if (!this.isArraysEqual(state.citySaved, this.state.citySaved) && state.citySaved.length) {
        this.setState({
          citySaved: state.citySaved,
        });
      }
    };

    store.subscribe(this.subscription);
    this.citiesData.getCitiesList();
    this.citiesData.downLoadCitiesData();
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscription);
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
          src: edit,
        }),
      ]),
      Skyact.createElement('div', {
          className: 'cities-wrapper',
        }, this.state.citySaved.length === this.citiesData.dataList.length &&
        this.citiesData.dataList.length ? this.state.citySaved.map(
          // eslint-disable-next-line function-paren-newline
          (city, i) => Skyact.createElement(CityBlock, this.citiesData.dataList[i])) : []),
    ]);
  }
}