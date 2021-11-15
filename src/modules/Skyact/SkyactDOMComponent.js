export default class SkyactDOMComponent {
  constructor(element) {
    this.currentElement = element;
  }

  mountComponent(container) {
    const domElement = document.createElement(this.currentElement.type);
    const text = this.currentElement.props.children;
    const textNode = document.createTextNode(text);
    domElement.appendChild(textNode);

    container.appendChild(domElement);

    this.hostNode = domElement;
    return domElement;
  }
}