/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import SkyactCompositeComponentWrapper from './SkyactCompositeComponentWrapper';
import SkyactComponent from './SkyactComponent';
import TopLevelWrapper from './TopLevelWrapper';
import SkyactReconciler from './SkyactReconciler';

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

function renderNewRootComponent(element, container) {
  const wrapperElement = createElement(TopLevelWrapper, element);
  const componentInstance = new SkyactCompositeComponentWrapper(wrapperElement);

  const markup = SkyactReconciler.mountComponent(componentInstance, container);

  // eslint-disable-next-line no-param-reassign
  container.skyactComponentInstance = componentInstance.renderedComponent;

  return markup;
}

function getTopLevelComponentInContainer(container) {
  return container.skyactComponentInstance;
}

function updateRootComponent(prevComponent, nextElement) {
  SkyactReconciler.receiveComponent(prevComponent, nextElement);
}

function render(element, container) {
  const prevComponent = getTopLevelComponentInContainer(container);

  if (prevComponent) {
    return updateRootComponent(prevComponent, element);
  }
  return renderNewRootComponent(element, container);
}

export default {
  createElement,
  render,
  SkyactComponent,
};