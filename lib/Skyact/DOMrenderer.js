// eslint-disable-next-line import/no-cycle
import instantiateSkyactComponent from './instantiateSkyactComponent';
import SkyactReconciler from './SkyactReconciler';

export default class DOMrenderer {
  constructor(facade) {
    this.facade = facade;
  }

  render(currentElement) {
    const domElement = document.createElement(currentElement.type);
    const props = currentElement.props;
    let children = currentElement.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }

    Object.keys(props).forEach((propName) => {
      if (propName === 'className' && typeof props[propName] === 'string') {
        props[propName]
          .split(' ')
          .forEach((string) => domElement.classList.add(string));
      } else if (
        propName === 'onClick' &&
        typeof props[propName] === 'function'
      ) {
        domElement.addEventListener('click', props[propName]);
      } else if (
        propName === 'onChange' &&
        typeof props[propName] === 'function'
      ) {
        domElement.addEventListener('change', props[propName]);
      } else if (
        propName === 'onInput' &&
        typeof props[propName] === 'function'
      ) {
        domElement.addEventListener('input', props[propName]);
      } else if (
        propName === 'getRef' &&
        typeof props[propName] === 'function'
      ) {
        props[propName](domElement);
      } else if (propName !== 'children') {
        domElement.setAttribute(propName, props[propName]);
      }
    });

    this.facade.updateRenderedChildren(
      children.map((child) => {
        if (typeof child === 'string' || !child) {
          return child;
        }
        return instantiateSkyactComponent(child);
      }),
    );

    this.facade.getRenderedChildren().map((child) => {
      if (!child) {
        return;
      }
      if (typeof child === 'string') {
        const textNode = document.createTextNode(child);
        domElement.appendChild(textNode);
        return textNode;
      }
      return SkyactReconciler.mountComponent(child, domElement);
    });

    return domElement;
  }
}
