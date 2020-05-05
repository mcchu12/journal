import axios from 'axios';
import { SIGN_UP, SIGN_IN, FETCH_USER } from './types';

export const signIn = (user) => async (dispatch) => {
  const res = await axios.post('/api/signin', user);

  console.log(res);

  dispatch({ type: SIGN_IN, payload: res.data });
};

export const signUp = (user) => async (dispatch) => {
  const res = await axios.post('/api/signup', user);

  dispatch({ type: SIGN_UP, payload: res.data });
};

export const fetchUser = () => async (dispatch) => {
  console.log('fetchUser');
  const res = await axios.get('/api/current_user');

  console.log(res);

  dispatch({ type: FETCH_USER, payload: res.data });
};
