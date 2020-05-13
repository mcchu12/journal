import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Container, Typography } from '@material-ui/core';
import Masonry from 'react-masonry-component';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

import { NoteCard } from './NoteCard';
import { Note } from './Note';

import { getNotes } from '../../actions';

const _Dashboard = ({ notes, getNotes }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  const masonryRef = useRef();

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  useEffect(() => {
    if (masonryRef.current) {
      setTimeout(() => {
        masonryRef.current.masonry.layout();
      }, 10);
    }
  }, [notes]);

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
      <Container maxWidth="md" className={classes.grid}>
        <Masonry
          ref={masonryRef}
          disableImagesLoaded
          updateOnEachImageLoad
          options={{ transitionDuration: 1, resize: true }}
        >
          {notes.map((note) => (
            <div
              key={note._id}
              className={classes.item}
              style={{ opacity: pathname.includes(note._id) ? 0 : 1 }}
            >
              <NoteCard
                key={note._id}
                note={note}
                showTitle
                editable={false}
                onClick={() => history.push(`/notes/${note._id}`)}
                maxHeight="300px"
              />
            </div>
          ))}
        </Masonry>
      </Container>
    );
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
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
      </Container>

      {renderList()}

      <Switch>
        <Route path={'/notes/:noteId'}>
          <Note />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  const notes = Object.values(state.noteCollection.notes);
  return {
    notes: _.reverse(notes),
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
    margin: theme.spacing(6, 'auto'),
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
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },

    [theme.breakpoints.up('md')]: {
      width: '33.33%',
    },
  },
}));
