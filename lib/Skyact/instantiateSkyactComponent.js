/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import SkyactDOMComponent from './SkyactDOMComponent';
import SkyactCompositeComponentWrapper from './SkyactCompositeComponentWrapper';

export default function instantiateSkyactComponent(element) {
  if (typeof element.type === 'string') {
    return new SkyactDOMComponent(element);
  }
  if (typeof element.type === 'function') {
    return new SkyactCompositeComponentWrapper(element);
  }
}