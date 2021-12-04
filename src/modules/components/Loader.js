/* eslint-disable class-methods-use-this */
import Skyact from '../Skyact';

import '../../styles/loader.sass';

export default class Loader extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('div', {
      className: 'windows8',
    }, [
      Skyact.createElement('div', {
        className: 'wBall',
        id: 'wBall_1',
      }, [
        Skyact.createElement('div', {
          className: 'wInnerBall',
        }, []),
      ]),
      Skyact.createElement('div', {
        className: 'wBall',
        id: 'wBall_2',
      }, [
        Skyact.createElement('div', {
          className: 'wInnerBall',
        }, []),
      ]),
      Skyact.createElement('div', {
        className: 'wBall',
        id: 'wBall_3',
      }, [
        Skyact.createElement('div', {
          className: 'wInnerBall',
        }, []),
      ]),
      Skyact.createElement('div', {
        className: 'wBall',
        id: 'wBall_4',
      }, [
        Skyact.createElement('div', {
          className: 'wInnerBall',
        }, []),
      ]),
      Skyact.createElement('div', {
        className: 'wBall',
        id: 'wBall_5',
      }, [
        Skyact.createElement('div', {
          className: 'wInnerBall',
        }, []),
      ]),
    ]);
  }
}