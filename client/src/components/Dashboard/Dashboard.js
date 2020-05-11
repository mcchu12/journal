import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { getNotes } from '../../actions';

import { NoteCard } from './NoteCard';
import { Note } from './Note';

import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

const _Dashboard = ({ notes, getNotes }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const renderList = () => {
    if (!notes.length) {
      return (
        <div className={classes.noItem}>
          <NoteAddOutlinedIcon fontSize="large" />

          <Typography variant="h5">Add your first note here</Typography>
        </div>
      );
    }
    return (
      <div className={classes.grid}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{ opacity: pathname.includes(note._id) ? 0 : 1 }}
          >
            <NoteCard
              key={note._id}
              note={note}
              showTitle
              editable={false}
              onClick={() => history.push(`/notes/${note._id}`)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <NoteCard
        note={{ title: '', content: '' }}
        editable={true}
        showTitle={false}
        alwaysShowToolbar={false}
        resetOnSubmit
        setFocusOnClick
        showTools={false}
        elevation={4}
      />

      {renderList()}

      <Switch>
        <Route path={'/notes/:noteId'}>
          <Note />
        </Route>
      </Switch>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: Object.values(state.noteCollection.notes),
  };
};

export const Dashboard = connect(mapStateToProps, { getNotes })(_Dashboard);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& > div:first-child': {
      marginTop: theme.spacing(4),
    },
  },
  grid: {
    margin: theme.spacing(2, 0),

    '& > div': {
      margin: theme.spacing(1, 0),
    },
  },
  noItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '& > svg, & > h5': {
      opacity: 0.5,
      marginBottom: theme.spacing(2),
    },
  },
  item: {
    opacity: (props) => props,
  },
}));
