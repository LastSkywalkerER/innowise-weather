export default class Transaction {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  perform(method) {
    const wrapperValue = this.wrapper.initialize();
    method();
    this.wrapper.close(wrapperValue);
  }
}