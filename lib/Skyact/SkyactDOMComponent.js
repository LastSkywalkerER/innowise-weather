// eslint-disable-next-line import/no-cycle
import DOMupdater from './DOMupdater';
// eslint-disable-next-line import/no-cycle
import DOMrenderer from './DOMrenderer';

export default class SkyactDOMComponent {
  constructor(element) {
    // текущий элемент
    this.currentElement = element;
    // внутренние потомки
    this.renderedChildren = [];
    // дом нода
    this.hostNode = null;

    this.DOMrenderer = new DOMrenderer(this);
    this.DOMupdater = new DOMupdater(this);
  }

  getPublicInstance() {
    return this.hostNode;
  }

  getHostNode() {
    return this.hostNode;
  }

  getRenderedChildren() {
    return this.renderedChildren;
  }

  updateRenderedChildren(newChildren) {
    this.renderedChildren = newChildren;
  }

  mountComponent(container) {
    const domElement = this.DOMrenderer.render(this.currentElement);

    if (container) {
      container.appendChild(domElement);
    }

    this.hostNode = domElement;
    return domElement;
  }

  receiveComponent(nextElement) {
    const prevElement = this.currentElement;
    this.updateComponent(prevElement, nextElement);
  }

  updateComponent(prevElement, nextElement) {
    const lastProps = prevElement.props;
    const nextProps = nextElement.props;
    this.currentElement = nextElement;

    this.DOMupdater.updateDOMProperties(lastProps, nextProps);
    this.DOMupdater.updateDOMChildren(lastProps, nextProps);
  }

  unmount() {
    this.renderedChildren.forEach((child) => {
      if (child && typeof child !== 'string') {
        child.unmount();
      }
    });
    // eslint-disable-next-line no-param-reassign

    this.hostNode.innerHTML = '';
  }
}
