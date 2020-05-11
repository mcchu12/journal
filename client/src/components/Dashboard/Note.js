import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { Dialog } from '@material-ui/core';
import { NoteCard } from './NoteCard';

export const _Note = ({
  note = { title: 'Error', content: 'No note found' },
}) => {
  const history = useHistory();

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={() => history.goBack()}
      open={true}
    >
      <NoteCard editable note={note} initialFocus />
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    note: state.noteCollection.notes[ownProps.match.params.noteId],
  };
};

export const Note = withRouter(connect(mapStateToProps, {})(_Note));
