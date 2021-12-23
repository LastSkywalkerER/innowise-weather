/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';
import CityBlock from '../components/CityBlock';
import CitySavedSearch from '../components/CitySavedSearch';
import isArraysEqual from '../helpers/isArrayEqual';

import CitySearch from '../helpers/CitySearch';
import {} from '../skyax/constants';
import store from '../skyax/store';
import { editCities } from '../skyax/actions';

import '../../styles/weather-icons.sass';
// Skyact.createElement('', null, [])

import '../../styles/city-saved.sass';

export default class CitySaved extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.citiesData = new CitySearch();
    this.state = {
      citySaved: store.getState().citySaved,
      editCities: store.getState().editCities,
    };
  }

  componentDidMount() {
    this.subscription = (state) => {
      if (!isArraysEqual(state.citySaved, this.state.citySaved)) {
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

    this.gradientStyle.innerHTML = `<svg
    version="1.1"
    id="moon"
    class="climacon climacon_moon"
    viewBox="15 15 70 70"
  >
    <defs>
    <radialGradient id="RadialGradientDark" cx="0" cy="0" r="1.5">
      <stop offset="0%" stop-color="#00C2FF"/>
      <stop offset="100%" stop-color="#FF4BF8"/>
    </radialGradient>
    <radialGradient id="RadialGradientLight" cx="0" cy="0" r="1.5">
      <stop offset="0%" stop-color="#FFD074"/>
      <stop offset="100%" stop-color="#FF3AB0"/>
    </radialGradient>
  </defs>
  </svg
  >`;
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    store.unsubscribe(this.subscription);
    store.dispatch(editCities(false));
  }

  render() {
    return Skyact.createElement(
      'div',
      {
        className: 'city-saved',
      },
      [
        Skyact.createElement(
          'div',
          {
            className: 'container',
          },
          [
            Skyact.createElement(CitySavedSearch, {
              addCity: this.citiesData.addCity.bind(this.citiesData),
              editCities: this.state.editCities,
            }),
            Skyact.createElement(
              'div',
              {
                className: 'cities-wrapper',
              },
              this.state.citySaved.length === this.citiesData.dataList.length &&
                this.citiesData.dataList.length
                ? this.state.citySaved.map(
                    // eslint-disable-next-line function-paren-newline
                    (city, i) =>
                      Skyact.createElement(CityBlock, {
                        ...this.citiesData.dataList[i],
                        index: i,
                        editable: this.state.editCities,
                        updater: this.citiesData.downLoadCitiesData.bind(
                          this.citiesData,
                          true,
                        ),
                      }),
                  )
                : [],
            ),
          ],
        ),
        Skyact.createElement('div', {
          getRef: (ref) => {
            this.gradientStyle = ref;
          },
        }),
      ],
    );
  }
}
