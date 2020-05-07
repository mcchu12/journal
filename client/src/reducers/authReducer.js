import { combineReducers } from 'redux';
import {
  signInActions,
  signUpActions,
  verifyUserActions,
  signOutAction,
} from '../actions/types';

const initialState = {
  signIn: {
    isSigningIn: false,
    signInErr: '',
  },
  signUp: {
    isSigningUp: false,
    signUpErr: '',
  },
  isVerifying: false, // todo change back to true
  user: {
    info: null,
    isAuthenticated: false,
  },
};

const isVerifying = (state = initialState.isVerifying, action) => {
  switch (action.type) {
    case verifyUserActions.request:
      return true;
    case verifyUserActions.success:
    case verifyUserActions.failure:
      return false;
    default:
      return state;
  }
};

const signIn = (state = initialState.signIn, action) => {
  switch (action.type) {
    case signInActions.request:
      return { ...state, isSigningIn: true };
    case signInActions.success:
      return { ...state, isSigningIn: false };
    case signInActions.failure:
      return { ...state, isSigningIn: false, signInErr: action.payload };
    default:
      return state;
  }
};

const signUp = (state = initialState.signUp, action) => {
  switch (action.type) {
    case signUpActions.request:
      return { ...state, isSigningUp: true };
    case signUpActions.success:
      return { ...state, isSigningUp: false };
    case signUpActions.failure:
      return { ...state, isSigningUp: false, signUpErr: action.payload };
    default:
      return state;
  }
};

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case signInActions.success:
    case signUpActions.success:
    case verifyUserActions.success:
      return { ...state, info: action.payload, isAuthenticated: true };

    case signOutAction:
      return { ...state, info: null, isAuthenticated: false };

    default:
      return state;
  }
};

export default combineReducers({
  signIn,
  signUp,
  isVerifying,
  user,
});
