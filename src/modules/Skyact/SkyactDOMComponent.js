/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
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

  getHostNode() {
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
      } else if (propName === 'onClick' && typeof props[propName] === 'function') {
        domElement.addEventListener('click', props[propName]);
      } else if (propName !== 'children') {
        domElement.setAttribute(propName, props[propName]);
      }
    });

    this.renderedChildren = children.map((child) => {
      if (typeof child === 'string' || !child) {
        return child;
      }
      return instantiateSkyactComponent(child);
    });

    this.renderedChildren.map((child) => {
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

    this.updateDOMProperties(lastProps, nextProps);
    this.updateDOMChildren(lastProps, nextProps);
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOMProperties(lastProps, nextProps) {
    const node = this.hostNode;
    Object.keys(lastProps).forEach((propName) => {
      // eslint-disable-next-line no-prototype-builtins
      if (propName === 'className' && lastProps[propName] !== nextProps[propName]) {
        node.removeAttribute('class');
        // eslint-disable-next-line no-prototype-builtins
      } else if (propName === 'onClick' && lastProps[propName] !== nextProps[propName]) {
        node.removeEventListener('click', lastProps[propName]);
        // eslint-disable-next-line no-prototype-builtins
      } else if (propName !== 'children' && !nextProps.hasOwnProperty(propName)) {
        node.removeAttribute(propName);
      }
    });
    Object.keys(nextProps).forEach((propName) => {
      if (propName === 'className' && typeof nextProps[propName] === 'string') {
        nextProps[propName].split(' ').forEach((string) => node.classList.add(string));
      } else if (propName === 'onClick' && typeof nextProps[propName] === 'function') {
        node.addEventListener('click', nextProps[propName]);
      } else if (propName !== 'children') {
        node.setAttribute(propName, nextProps[propName]);
      }
    });
  }

  updateDOMChildren(lastProps, nextProps) {
    let prevChildren = lastProps.children || [];
    if (!Array.isArray(prevChildren)) {
      prevChildren = [prevChildren];
    }
    let nextChildren = nextProps.children || [];
    if (!Array.isArray(nextChildren)) {
      nextChildren = [nextChildren];
    }

    const prevRenderedChildren = this.renderedChildren;
    const nextRenderedChildren = [];

    const opertionQueue = [];

    for (let i = 0; i < nextChildren.length; i++) {
      const prevChild = prevRenderedChildren[i];

      if (!prevChild) {
        const nextChid = instantiateSkyactComponent(nextChildren[i]);
        const node = SkyactReconciler.mountComponent(nextChid);

        opertionQueue.push({
          type: 'ADD',
          node,
        });
        nextRenderedChildren.push(nextChid);
        continue;
      }

      const canUpdate = prevChildren[i].type === nextChildren[i].type;

      if (!canUpdate) {
        const prevNode = prevChild.getHostNode();
        prevChild.unmount();

        const nextChild = instantiateSkyactComponent(nextChildren[i]);
        const nextNode = SkyactReconciler.mountComponent(nextChild);

        opertionQueue.push({
          type: 'REPLACE',
          prevNode,
          nextNode,
        });
        nextRenderedChildren.push(nextChild);
        continue;
      }

      if (typeof prevChild === 'string') {
        this.hostNode.innerText = nextChildren[i];
      } else {
        SkyactReconciler.receiveComponent(prevChild, nextChildren[i]);
      }
      nextRenderedChildren.push(prevChild);
    }

    for (let i = nextChildren.length; i < prevChildren.length; i++) {
      const prevChild = prevRenderedChildren[i];
      const node = prevChild.getHostNode();
      prevChild.unmount();

      opertionQueue.push({
        type: 'REMOVE',
        node,
      });
    }

    this.renderedChildren = nextRenderedChildren;

    while (opertionQueue.length > 0) {
      const operation = opertionQueue.shift();

      switch (operation.type) {
        case 'ADD':
          this.hostNode.appendChild(operation.node);
          break;
        case 'REPLACE':
          this.hostNode.replaceChild(operation.nextNode, operation.prevNode);
          break;
        case 'REMOVE':
          this.hostNode.removeChild(operation.node);
          break;
        default:
          break;
      }
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