/* eslint-disable class-methods-use-this */
import SELECTION_RESTORATION from './SELECTION_RESTORATION';
import Transaction from './Transaction';

const updateTransaction = new Transaction(SELECTION_RESTORATION);

export default class SkyactReconciler {
  static mountComponent(internalInstance, container) {
    return internalInstance.mountComponent(container);
  }

  static receiveComponent(internalInstance, nextElement) {
    updateTransaction.perform(() => internalInstance.receiveComponent(nextElement));
  }

  static performUpdateIfNecessary(internalInstance) {
    internalInstance.performUpdateIfNecessary();
  }
}