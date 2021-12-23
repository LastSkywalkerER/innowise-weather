/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class SkyactInstanceMap {
  static set(key, value) {
    key.skyactIntenalInstance = value;
  }

  static get(key) {
    return key.skyactIntenalInstance;
  }
}