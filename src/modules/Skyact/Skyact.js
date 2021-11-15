/* eslint-disable class-methods-use-this */
import SkyactDOMComponent from './SkyactDOMComponent';

function createElement(type, props, children) {
  const element = {
    type,
    props: props || {},
  };

  if (children) {
    element.props.children = children;
  }
  return element;
}

function render(element, container) {
  const componentInstance = new SkyactDOMComponent(element);
  return componentInstance.mountComponent(container);
}

class SkyactComponent {
  constructor(props) {
    this.props = props;
  }

  render() {
    throw Error('Method render must be implemented in custom component');
  }
}

export default {
  createElement,
  render,
  SkyactComponent,
};