export default function rootReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        ...action,
        page: action.payload,
      };
    default:
      break;
  }

  return state;
}