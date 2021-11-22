export default function createStore(rootReducer, initialValue) {
  let state = rootReducer(initialValue, {
    type: '___INIT___',
  });
  const subscribers = [];

  return {
    // action === {type: 'ACTION'}
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub(state));
    },
    subscribe(callback) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    },
  };
}