/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import Skyact from '.';

export default class SkyactDOMComponent {
  constructor(element) {
    this.currentElement = element;
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

    children.forEach((childElement) => {
      if (typeof childElement === 'string') {
        const textNode = document.createTextNode(childElement);
        domElement.appendChild(textNode);
      } else {
        Skyact.render(childElement, domElement);
      }
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