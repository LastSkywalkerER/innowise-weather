// eslint-disable-next-line import/no-cycle
import instantiateSkyactComponent from './instantiateSkyactComponent';
import SkyactReconciler from './SkyactReconciler';

export default class DOMupdater {
  constructor(facade) {
    this.facade = facade;
  }

  updateDOMProperties(lastProps, nextProps) {
    const node = this.facade.getHostNode();

    Object.keys(lastProps).forEach((propName) => {
      if (
        propName === 'className' &&
        lastProps[propName] !== nextProps[propName]
      ) {
        node.removeAttribute('class');
      } else if (
        propName === 'onClick' &&
        lastProps[propName] !== nextProps[propName]
      ) {
        node.removeEventListener('click', lastProps[propName]);
      } else if (
        propName === 'onChange' &&
        lastProps[propName] !== nextProps[propName]
      ) {
        node.removeEventListener('change', lastProps[propName]);
      } else if (
        propName === 'onInput' &&
        lastProps[propName] !== nextProps[propName]
      ) {
        node.removeEventListener('input', lastProps[propName]);
      } else if (
        propName !== 'children' &&
        !nextProps.hasOwnProperty(propName)
      ) {
        node.removeAttribute(propName);
      }
    });
    Object.keys(nextProps).forEach((propName) => {
      if (propName === 'className' && typeof nextProps[propName] === 'string') {
        nextProps[propName]
          .split(' ')
          .forEach((string) => node.classList.add(string));
      } else if (
        propName === 'onClick' &&
        typeof nextProps[propName] === 'function'
      ) {
        node.addEventListener('click', nextProps[propName]);
      } else if (
        propName === 'onChange' &&
        typeof nextProps[propName] === 'function'
      ) {
        node.addEventListener('change', nextProps[propName]);
      } else if (
        propName === 'onInput' &&
        typeof nextProps[propName] === 'function'
      ) {
        node.addEventListener('input', nextProps[propName]);
      } else if (
        propName === 'getRef' &&
        typeof nextProps[propName] === 'function'
      ) {
        nextProps[propName](node);
      } else if (propName !== 'children') {
        node.setAttribute(propName, nextProps[propName]);
      }
    });
  }

  updateDOMChildren(lastProps, nextProps) {
    const hostNode = this.facade.getHostNode();

    let prevChildren = lastProps.children || [];
    if (!Array.isArray(prevChildren)) {
      prevChildren = [prevChildren];
    }
    let nextChildren = nextProps.children || [];
    if (!Array.isArray(nextChildren)) {
      nextChildren = [nextChildren];
    }

    const prevRenderedChildren = this.facade.getRenderedChildren();
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
        hostNode.innerText = nextChildren[i];
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

    this.facade.updateRenderedChildren(nextRenderedChildren);

    while (opertionQueue.length > 0) {
      const operation = opertionQueue.shift();

      switch (operation.type) {
        case 'ADD':
          hostNode.appendChild(operation.node);
          break;
        case 'REPLACE':
          try {
            hostNode.replaceChild(operation.nextNode, operation.prevNode);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
          }
          break;
        case 'REMOVE':
          try {
            hostNode.removeChild(operation.node);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
          }
          break;
        default:
          break;
      }
    }
  }
}
