export default function createStore(rootReducer, initialValue) {
  let state = rootReducer(initialValue, {
    type: '___INIT___',
  });
  let subscribers = [];

  return {
    // action === {type: 'ACTION'}
    dispatch(action) {
      // console.log(action.type);
      state = rootReducer(state, action);
      subscribers.forEach((sub) => sub(state, action.type));
    },
    subscribe(callback) {
      subscribers.push(callback);
    },
    unsubscribe(callback) {
      subscribers = subscribers.filter((item) => item !== callback);
    },
    getState() {
      return state;
    },
  };
}