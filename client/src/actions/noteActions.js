import axios from 'axios';

import {
  addNoteActions,
  saveNoteActions,
  getNoteActions,
  deleteNoteActions,
} from './types';

export const saveNote = (id, note) => async (dispatch) => {
  dispatch({ type: saveNoteActions.request });

  try {
    const res = await axios.put(`/api/save-note/${id}`, note);

    dispatch({ type: saveNoteActions.success, payload: res.data });
  } catch (err) {
    dispatch({
      type: saveNoteActions.failure,
      payload: err.response.data.message,
    });
  }
};

export const addNote = (note) => async (dispatch) => {
  dispatch({ type: addNoteActions.request });

  try {
    const res = await axios.post('/api/add-note', note);

    dispatch({ type: addNoteActions.success, payload: res.data });
  } catch (err) {
    dispatch({
      type: addNoteActions.failure,
      payload: err.response.data.message,
    });
  }
};

export const getNotes = () => async (dispatch) => {
  dispatch({ type: getNoteActions.request });

  try {
    const res = await axios.get('/api/get-notes');

    dispatch({ type: getNoteActions.success, payload: res.data });
  } catch (err) {
    dispatch({
      type: getNoteActions.failure,
      payload: err.response.data.message,
    });
  }
};

export const deleteNote = (id) => async (dispatch) => {
  dispatch({ type: deleteNoteActions.request });

  try {
    const res = await axios.delete(`/api/delete-note/${id}`);

    dispatch({ type: deleteNoteActions.success, payload: res.data });
  } catch (err) {
    dispatch({
      type: deleteNoteActions.failure,
      payload: err.response.data.message,
    });
  }
};
