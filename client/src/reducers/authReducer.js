import { SIGN_UP, FETCH_USER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SIGN_UP:
      console.log('hellow');
      return action.payload || false;
    default:
      return state;
  }
};
