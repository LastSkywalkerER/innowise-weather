import SkyactReconciler from './SkyactReconciler';
import SkyactInstanceMap from './SkyactInstanceMap';
/* eslint-disable class-methods-use-this */
export default class SkyactComponent {
  constructor(props) {
    this.props = props;

    this.state = {};
  }

  setState(partialState) {
    const internalInstance = SkyactInstanceMap.get(this);

    internalInstance.pendingPartialState = internalInstance.pendingPartialState || [];
    internalInstance.pendingPartialState.push(partialState);

    if (!internalInstance.rendering) {
      SkyactReconciler.performUpdateIfNecessary(internalInstance);
    }
  }

  render() {
    throw Error('Method render must be implemented in custom component');
  }
}