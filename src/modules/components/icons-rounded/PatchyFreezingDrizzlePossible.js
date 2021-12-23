/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';

export default class PatchyFreezingDrizzlePossible extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.ref = undefined;
  }

  componentDidMount() {
    this.ref.innerHTML = `<svg
    version="1.1"
    id="cloudHailAlt"
    class="climacon climacon_cloudHailAlt"
    viewBox="15 15 70 70"
  >
    <g class="climacon_iconWrap climacon_iconWrap-cloudHailAlt">
      <g class="climacon_wrapperComponent climacon_wrapperComponent-hailAlt">
        <g
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_hailAlt
            climacon_component-stroke_hailAlt-left
          "
        >
          <circle cx="42" cy="65.498" r="2" />
        </g>
        <g
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_hailAlt
            climacon_component-stroke_hailAlt-middle
          "
        >
          <circle cx="49.999" cy="65.498" r="2" />
        </g>
        <g
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_hailAlt
            climacon_component-stroke_hailAlt-right
          "
        >
          <circle cx="57.998" cy="65.498" r="2" />
        </g>
        <g
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_hailAlt
            climacon_component-stroke_hailAlt-left
          "
        >
          <circle cx="42" cy="65.498" r="2" />
        </g>
        <g
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_hailAlt
            climacon_component-stroke_hailAlt-middle
          "
        >
          <circle cx="49.999" cy="65.498" r="2" />
        </g>
        <g
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_hailAlt
            climacon_component-stroke_hailAlt-right
          "
        >
          <circle cx="57.998" cy="65.498" r="2" />
        </g>
      </g>
      <g class="climacon_wrapperComponent climacon_wrapperComponent-cloud">
        <path
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_cloud
          "
          d="M63.999,64.941v-4.381c2.39-1.384,3.999-3.961,3.999-6.92c0-4.417-3.581-8-7.998-8c-1.602,0-3.084,0.48-4.334,1.291c-1.23-5.317-5.974-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.998c0,3.549,1.55,6.728,3.999,8.924v4.916c-4.776-2.768-7.998-7.922-7.998-13.84c0-8.835,7.162-15.997,15.997-15.997c6.004,0,11.229,3.311,13.966,8.203c0.663-0.113,1.336-0.205,2.033-0.205c6.626,0,11.998,5.372,11.998,12C71.998,58.863,68.656,63.293,63.999,64.941z"
        />
      </g>
    </g></svg
  ><!-- cloudHailAlt -->`;
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
