import axios from 'axios';

import { addNoteActions } from './types';

export const addNote = (note) => async (dispatch) => {
  console.log(note);

  dispatch({ type: addNoteActions.request });

  try {
    const res = await axios.post('/api/add-note', note);

    dispatch({ type: addNoteActions.success, payload: res.data });
  } catch (err) {
    dispatch({ type: addNoteActions.failure, payload: err.response.message });
  }
};

export const getNotes = () => async (dispatch) => {
  const res = await axios.get('/api/get-notes');

  console.log(res.data);
};
