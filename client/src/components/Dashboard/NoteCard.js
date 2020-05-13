import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { makeStyles, Button, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { saveNote, deleteNote, addNote } from '../../actions';
import { EditableField } from './EditableField';

const _NoteCard = ({
  note,
  onClick,
  setFocusOnClick,
  initialFocus = false,
  editable = true,
  showDate = false,
  showTitle = false,
  showContent = true,
  alwaysShowToolbar = true,
  showTools = true,
  resetOnSubmit = false,
  maxHeight,
  elevation = 0,
  submitCallback,
  addNote,
  saveNote,
  deleteNote,
}) => {
  const containerRef = useRef();
  const formRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const [state, setState] = useState(null);
  const [isHovered, setHover] = useState(false);
  const [isFocused, setFocus] = useState(initialFocus);

  const history = useHistory();
  const { pathname } = useLocation();
  const classes = useStyles({
    showTitle: showTitle && note.title,
    showContent: showContent || note.content,
    isFocused,
    isHovered,
    elevation,
    maxHeight,
  });

  useEffect(() => {
    setState(note);
  }, [note]);

  // Unfocus card when click outsize
  useEffect(() => {
    const handleFocus = (e) => {
      if (containerRef.current.contains(e.target)) {
        return;
      } else if (isFocused) {
        formRef.current.submitForm();
        if (setFocusOnClick) setFocus(false);
      }
    };

    document.addEventListener('mousedown', handleFocus);

    return () => {
      document.removeEventListener('mousedown', handleFocus);
    };
  }, [isFocused, setFocusOnClick]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = () => {
    if (onClick) onClick();
    if (setFocusOnClick) setFocus(true);
  };

  // Reset Form
  const resetForm = () => {
    titleRef.current.reset();
    contentRef.current.reset();
  };

  const handleDelete = (id) => {
    deleteNote(id);
    if (pathname === '/') return;
    history.goBack();
  };

  // Handle form submit
  const handleSubmit = (values) => {
    const initial = _.pick(state, ['title', 'content']);

    if (!_.isEqual(initial, values)) {
      const newNote = {
        title: titleRef.current.getValue(),
        content: contentRef.current.getValue(),
      };
      // Update if note already exist
      if (note._id) {
        saveNote(note._id, newNote);
      } else {
        // Ow create new note
        addNote(newNote);
      }
    }

    if (resetOnSubmit) resetForm();
    if (setFocusOnClick) setFocus(false);
    if (submitCallback) submitCallback();
  };

  // Parse date
  const parseDate = (date) => {
    const current = new Date(date).toDateString().split(' ');
    return [current[1], current[2]].join(' ');
  };

  const renderForm = () => {
    return (
      <Formik
        innerRef={formRef}
        initialValues={{ title: note.title, content: note.content }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div onClick={handleClick}>
            <EditableField
              ref={titleRef}
              name="title"
              placeholder="Title"
              className={classes.title}
              singleLine
              editable={editable}
            />
            <EditableField
              ref={contentRef}
              name="content"
              placeholder="Take a note..."
              className={classes.content}
              editable={editable}
            />
          </div>

          {note.lastEdited && showDate && (
            <div className={classes.date}>
              <Typography variant="caption">
                Edited {parseDate(note.lastEdited)}
              </Typography>
            </div>
          )}
          {(alwaysShowToolbar || isFocused) && (
            <div className={classes.toolbar}>
              {showTools && (
                <div className={classes.tools}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDelete(note._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
              {isFocused && (
                <Button color="secondary" type="submit">
                  Close
                </Button>
              )}
            </div>
          )}
        </Form>
      </Formik>
    );
  };

  return (
    <div
      ref={containerRef}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderForm()}
    </div>
  );
};

export const NoteCard = connect(null, { saveNote, deleteNote, addNote })(
  _NoteCard
);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    border: ({ elevation }) =>
      elevation ? 'none' : `1px solid ${theme.palette.background.default}`,

    boxShadow: ({ elevation, isHovered }) =>
      elevation
        ? theme.shadows[elevation]
        : isHovered
        ? theme.shadows[2]
        : 'none',
    transition: 'box-shadow 200ms ease-out',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  date: {
    textAlign: 'right',
  },
  toolbar: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > button': {
      marginLeft: 'auto',
      fontWeight: 700,
      textTransform: 'initial',
    },
  },
  tools: {
    opacity: ({ isFocused, isHovered }) => (isHovered || isFocused ? 1 : 0),
    transition: 'opacity 200ms ease-out',
  },
  title: {
    display: ({ isFocused, showTitle }) =>
      isFocused || showTitle ? 'block' : 'none',
    ...theme.typography.body1,
    fontWeight: 700,
  },
  content: {
    display: ({ showContent }) => (showContent ? 'block' : 'none'),
    ...theme.typography.body2,
    fontWeight: 600,
    textOverflow: 'ellipsis',
    maxHeight: ({ maxHeight }) => maxHeight,
    overflow: ({ maxHeight }) => (maxHeight ? 'hidden' : 'visible'),
  },
}));
