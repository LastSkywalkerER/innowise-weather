/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';
import CityBlock from '../components/CityBlock';
import CityListItem from '../components/CityListItem';
import CitySearch from '../helpers/CitySearch';
import {
  CITIES_LOADING,
} from '../Skyax/constants';
import store from '../Skyax/store';

import search from '../../static/weather-img/icons/search.svg';
import edit from '../../static/weather-img/icons/edit.svg';
import shinyRounded from '../../static/weather-img/icons/shiny-rounded.svg';
import snowRounded from '../../static/weather-img/icons/snow-dounded.svg';
import cloudyRounded from '../../static/weather-img/icons/cloudy-rounded.svg';
import rainRounded from '../../static/weather-img/icons/rain-rounded.svg';
import cloudsRounded from '../../static/weather-img/icons/clouds-rounded.svg';
// Skyact.createElement('', null, [])

import '../../styles/city-saved.sass';

export default class CitySaved extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.citiesData = new CitySearch();
    this.state = {
      cityes: [{
        city: 'Austin',
        country: 'USA',
        temp: '22°',
        icon: shinyRounded,
        humidity: '17%',
        wind: '7km/h',
      }, {
        city: 'New York',
        country: 'USA',
        temp: '-5°',
        icon: snowRounded,
        humidity: '17%',
        wind: '7km/h',
      }, {
        city: 'Jakarta',
        country: 'INA',
        temp: '20°',
        icon: cloudyRounded,
        humidity: '27%',
        wind: '20km/h',
      }, {
        city: 'Tokyo',
        country: 'JPN',
        temp: '16°',
        icon: rainRounded,
        humidity: '17%',
        wind: '7km/h',
      }, {
        city: 'Bangkok',
        country: 'THAI',
        temp: '22°',
        icon: cloudsRounded,
        humidity: '17%',
        wind: '7km/h',
      }, {
        city: 'Manila',
        country: 'FLP',
        temp: '16°',
        icon: rainRounded,
        humidity: '17%',
        wind: '7km/h',
      }],
      cities: [{
        name: 'Minsk',
      }],
    };
  }

  componentDidMount() {
    store.subscribe((state) => {
      if (!state[CITIES_LOADING]) {
        this.setState({
          [CITIES_LOADING]: state[CITIES_LOADING],
        });
      }
    });
  }

  render() {
    console.log(this.citiesData.cityList);

    return Skyact.createElement('div', {
      className: 'city-saved container',
    }, [Skyact.createElement('div', {
        className: 'search-block',
      }, [
        Skyact.createElement('img', {
          src: search,
        }),
        Skyact.createElement('input', {
          placeHolder: 'Search',
          list: 'citiesList',
          onInput: (event) => {
            this.citiesData.getCitiesList(event.target.value);
          },
        }),
        Skyact.createElement('datalist', {
          id: 'citiesList',
        }, this.citiesData.cityList.map((city) => Skyact.createElement(CityListItem, city))),
        // Skyact.createElement('div', null, [

        // ]),
        Skyact.createElement('img', {
          src: edit,
        }),
      ]),
      Skyact.createElement('div', {
        className: 'cities-wrapper',
      }, this.state.cityes.map((city) => Skyact.createElement(CityBlock, city))),
    ]);
  }
}