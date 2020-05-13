import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Dialog } from '@material-ui/core';
import { NoteCard } from './NoteCard';

export const _Note = ({
  note = { title: 'Error', content: 'No note found' },
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => history.goBack()}
      open={true}
      classes={{ paper: classes.paper }}
    >
      <NoteCard
        editable
        note={note}
        initialFocus
        submitCallback={() => history.goBack()}
        showDate
      />
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    note: state.noteCollection.notes[ownProps.match.params.noteId],
  };
};

export const Note = withRouter(connect(mapStateToProps, {})(_Note));

const useStyles = makeStyles(() => ({
  paper: {
    overflow: 'hidden',
    position: 'relative',
  },
}));
