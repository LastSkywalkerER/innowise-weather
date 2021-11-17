/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import instantiateSkyactComponent from './instantiateSkyactComponent';
import SkyactReconciler from './SkyactReconciler';

export default class SkyactDOMComponent {
  constructor(element) {
    // текущий элемент
    this.currentElement = element;
    // внутренние потомки
    this.renderedChildren = [];
    // дом нода
    this.hostNode = null;
  }

  getPublicInstance() {
    return this.hostNode;
  }

  mountComponent(container) {
    const domElement = document.createElement(this.currentElement.type);
    const props = this.currentElement.props;
    let children = this.currentElement.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }

    Object.keys(props).forEach((propName) => {
      if (propName === 'className' && typeof props[propName] === 'string') {
        props[propName].split(' ').forEach((string) => domElement.classList.add(string));
      } else if (propName !== 'children') {
        domElement.setAttribute(propName, props[propName]);
      }
    });

    this.renderedChildren = children.map((child) => {
      if (typeof child === 'string') {
        return child;
      }
      return instantiateSkyactComponent(child);
    });

    this.renderedChildren.map((child) => {
      if (typeof child === 'string') {
        const textNode = document.createTextNode(child);
        domElement.appendChild(textNode);
        return textNode;
      }
      return SkyactReconciler.mountComponent(child, domElement);
    });

    container.appendChild(domElement);

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

    this.updateDOMProperties(lastProps, nextProps);
    this.updateDOMChildren(lastProps, nextProps);

    this.currentElement = nextElement;
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOMProperties(lastProps, nextProps) {

  }

  updateDOMChildren(lastProps, nextProps) {
    const lastContent = lastProps.children;
    const nextContent = nextProps.children;

    if (!nextContent) {
      this.updateTextContent('');
    } else if (lastContent !== nextContent) {
      this.updateTextContent(`${nextContent}`);
    }
  }

  updateTextContent(text) {
    const node = this.hostNode;

    // eslint-disable-next-line prefer-destructuring
    const firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = text;
      return;
    }

    node.textContent = text;
  }
}