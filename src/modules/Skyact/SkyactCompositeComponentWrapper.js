/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import SkyactReconciler from './SkyactReconciler';
import SkyactInstanceMap from './SkyactInstanceMap';
import instantiateSkyactComponent from './instantiateSkyactComponent';

export default class SkyactCompositeComponentWrapper {
  constructor(element) {
    // текущий элемент
    this.currentElement = element;
    // Внутренний экземпляр
    this.renderedComponent = null;
    // внешний экземпляр
    this.instance = null;
  }

  getPublicInstance() {
    return this.instance;
  }

  mountComponent(container) {
    const Component = this.currentElement.type;
    const componentInstance = new Component(this.currentElement.props);
    this.instance = componentInstance;

    SkyactInstanceMap.set(componentInstance, this);

    const markup = this.performInitialMount(container);

    if (componentInstance.componentDidMount) {
      componentInstance.componentDidMount();
    }

    return markup;
  }

  performInitialMount(container) {
    const renderedElement = this.instance.render();

    const child = instantiateSkyactComponent(renderedElement);
    this.renderedComponent = child;

    return SkyactReconciler.mountComponent(child, container);
  }

  receiveComponent(nextElement) {
    const prevElement = this.currentElement;
    this.updateComponent(prevElement, nextElement);
  }

  updateComponent(prevElement, nextElement) {
    this.rendering = true;
    const nextProps = nextElement.props;
    const inst = this.instance;
    let shouldUpdate = true;

    const nextState = this.processPendingState();
    this.pendingPartialState = null;

    if (inst.shouldComponentUpdate) {
      shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState);
    }

    if (shouldUpdate) {
      this.performComponentUpdate(nextElement, nextProps, nextState);

      if (inst.componentDidUpdate) {
        inst.componentDidUpdate();
      }
    } else {
      inst.props = nextProps;
      inst.state = nextState;
    }
    this.rendering = false;
  }

  processPendingState() {
    const inst = this.instance;
    if (!this.pendingPartialState) {
      return inst.state;
    }

    let nextState = inst.state;

    this.pendingPartialState.forEach((oneState) => {
      if (typeof oneState === 'function') {
        nextState = {
          ...nextState,
          ...oneState(nextState),
        };
      }
      nextState = {
        ...nextState,
        ...oneState,
      };
    });

    this.pendingPartialState = null;
    return nextState;
  }

  performUpdateIfNecessary() {
    this.updateComponent(this.currentElement, this.currentElement);
  }

  performComponentUpdate(nextElement, nextProps, nextState) {
    this.currentElement = nextElement;
    const inst = this.instance;

    inst.props = nextProps;
    inst.state = nextState;

    this.updateRenderedComponent();
  }

  updateRenderedComponent() {
    const prevComponentInstance = this.renderedComponent;
    const inst = this.instance;
    const nextRenderedElement = inst.render();

    SkyactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement);
  }
}