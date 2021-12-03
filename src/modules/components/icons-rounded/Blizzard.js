/* eslint-disable class-methods-use-this */
import Skyact from '../../Skyact';

export default class Blizzard extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.ref = undefined;
  }

  componentDidMount() {
    this.ref.innerHTML = `<svg
    version="1.1"
    id="cloudSnowAltFill"
    class="climacon climacon_cloudSnowAltFill"
    viewBox="15 15 70 70"
  >
    <g class="climacon_iconWrap climacon_iconWrap-cloudSnowAltFill">
      <g class="climacon_wrapperComponent climacon_wrapperComponent-snowAlt">
        <g
          class="
            climacon_component climacon_component climacon_component-snowAlt
          "
        >
          <path
            class="
              climacon_component
              climacon_component-stroke
              climacon_component-stroke_snowAlt
            "
            d="M43.072,59.641c0.553-0.957,1.775-1.283,2.732-0.731L48,60.176v-2.535c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2v2.535l2.195-1.268c0.957-0.551,2.18-0.225,2.73,0.732c0.553,0.957,0.225,2.18-0.73,2.731l-2.196,1.269l2.196,1.268c0.955,0.553,1.283,1.775,0.73,2.732c-0.552,0.954-1.773,1.282-2.73,0.729L52,67.104v2.535c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2v-2.535l-2.195,1.269c-0.957,0.553-2.18,0.226-2.732-0.729c-0.552-0.957-0.225-2.181,0.732-2.732L46,63.641l-2.195-1.268C42.848,61.82,42.521,60.598,43.072,59.641z"
          />
          <circle
            class="
              climacon_component
              climacon_component-fill
              climacon_component-fill_snowAlt
            "
            fill="#FFFFFF"
            cx="50"
            cy="63.641"
            r="2"
          />
        </g>
      </g>
      <g class="climacon_componentWrap climacon_componentWrap_cloud">
        <path
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_cloud
          "
          d="M43.945,65.639c-8.835,0-15.998-7.162-15.998-15.998c0-8.836,7.163-15.998,15.998-15.998c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,6.625-5.371,11.998-11.998,11.998C57.168,65.639,47.143,65.639,43.945,65.639z"
        />
        <path
          class="
            climacon_component
            climacon_component-fill
            climacon_component-fill_cloud
          "
          fill="#FFFFFF"
          d="M59.943,61.639c4.418,0,8-3.582,8-7.998c0-4.417-3.582-8-8-8c-1.601,0-3.082,0.481-4.334,1.291c-1.23-5.316-5.973-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.999c0,6.626,5.372,11.998,11.998,11.998C47.562,61.639,56.924,61.639,59.943,61.639z"
        />
      </g>
    </g></svg
  ><!-- cloudSnowAltFill -->`;
  }

  render() {
    return Skyact.createElement('div', {
      className: 'saved-icon saved-icon--clear',
      getRef: (ref) => {
        this.ref = ref;
      },
    });
  }
}