import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  addNoteActions,
  saveNoteActions,
  getNoteActions,
  deleteNoteActions,
} from '../actions/types';

const initialState = {
  notes: {},
};

const notes = (state = initialState.notes, action) => {
  switch (action.type) {
    case saveNoteActions.success:
    case addNoteActions.success:
      return { ...state, [action.payload._id]: { ...action.payload } };

    case getNoteActions.success:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case deleteNoteActions.success:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  notes,
});
