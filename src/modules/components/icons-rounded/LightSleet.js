/* eslint-disable class-methods-use-this */
import Skyact from 'Skyact';

export default class LightSleet extends Skyact.SkyactComponent {
  constructor(props) {
    super(props);
    this.ref = undefined;
  }

  componentDidMount() {
    this.ref.innerHTML = `<svg
    version="1.1"
    id="cloudSnow"
    class="climacon climacon_cloudSnow"
    viewBox="15 15 70 70"
  >
    <g class="climacon_iconWrap climacon_iconWrap-cloudSnow">
      <g
        class="climacon_wrapperComponent climacon_wrapperComponent-snow"
        clip-path="url(#snowFillClip)"
      >
        <circle
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_snow
            climacon_component-stroke_snow-left
          "
          cx="42.001"
          cy="59.641"
          r="2"
        />
        <circle
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_snow
            climacon_component-stroke_snow-middle
          "
          cx="50.001"
          cy="59.641"
          r="2"
        />
        <circle
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_snow
            climacon_component-stroke_snow-right
          "
          cx="57.999"
          cy="59.641"
          r="2"
        />
      </g>
      <g class="climacon_wrapperComponent climacon_wrapperComponent-cloud">
        <path
          class="
            climacon_component
            climacon_component-stroke
            climacon_component-stroke_cloud
          "
          d="M63.999,64.943v-4.381c2.39-1.386,3.999-3.963,3.999-6.922c0-4.417-3.581-7.999-7.999-7.999c-1.601,0-3.083,0.48-4.333,1.291c-1.23-5.317-5.974-9.291-11.665-9.291c-6.627,0-11.998,5.373-11.998,12c0,3.549,1.55,6.729,4,8.924v4.916c-4.777-2.769-8-7.922-8-13.84c0-8.836,7.163-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.337-0.205,2.033-0.205c6.627,0,11.999,5.373,11.999,11.999C71.998,58.863,68.654,63.293,63.999,64.943z"
        />
      </g>
    </g></svg
  ><!-- cloudSnow -->`;
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
