import axios from 'axios';
import {
  signInActions,
  signOutAction,
  signUpActions,
  verifyUserActions,
} from './types';

export const signIn = (user) => async (dispatch) => {
  dispatch({ type: signInActions.request });

  try {
    const res = await axios.post('/api/signin', user);

    dispatch({ type: signInActions.success, payload: res.data });
  } catch (err) {
    dispatch({
      type: signInActions.failure,
      payload: err.response.data.message,
    });
  }
};

export const clearSignInErr = () => {
  return { type: signInActions.clearErr };
};

export const signUp = (user) => async (dispatch) => {
  dispatch({ type: signUpActions.request });

  try {
    const res = await axios.post('/api/signup', user);

    dispatch({ type: signUpActions.success, payload: res.data });
  } catch (err) {
    dispatch({
      type: signUpActions.failure,
      payload: err.response.data.message,
    });
  }
};

export const clearSignUpErr = () => {
  return { type: signUpActions.clearErr };
};

export const verifyUser = () => async (dispatch) => {
  dispatch({ type: verifyUserActions.request });

  const res = await axios.get('/api/current_user');

  if (res.data) {
    dispatch({ type: verifyUserActions.success, payload: res.data });
  } else {
    dispatch({ type: verifyUserActions.failure });
  }
};

export const signOut = () => async (dispatch) => {
  await axios.get('/api/signout');

  dispatch({ type: signOutAction });
};
