import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { makeStyles, Button } from '@material-ui/core';

import { EditableField } from './EditableField';
import { addNote, getNotes } from '../../actions';

const _EditableCard = ({ getNotes, addNote }) => {
  const [focused, setFocus] = useState(false);

  const elRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const classes = useStyles({ focused });

  // Unfocus card when click outsize
  useEffect(() => {
    const handleClick = (e) => {
      if (elRef.current.contains(e.target)) {
        if (!focused) {
          setFocus(true);
        }
        return;
      }

      resetForm();
      setFocus(false);
    };

    document.addEventListener('mousedown', handleClick, false);

    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, [focused]);

  const resetForm = () => {
    titleRef.current.reset();
    contentRef.current.reset();
  };

  // Handle form submit
  const handleClose = (values) => {
    addNote(values);
    resetForm();
    setFocus(false);
  };

  return (
    <div ref={elRef}>
      <Formik initialValues={{ title: '', content: '' }} onSubmit={handleClose}>
        <Form className={classes.card}>
          <EditableField
            ref={titleRef}
            name="title"
            placeholder="Title"
            className={classes.title}
            singleLine
          />
          <EditableField
            ref={contentRef}
            name="content"
            placeholder="Take a note..."
            className={classes.content}
          />

          {focused && (
            <div className={classes.toolbar}>
              <Button onClick={getNotes}>Get</Button>
              <Button color="secondary" type="submit">
                Close
              </Button>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export const EditableCard = connect(null, { addNote, getNotes })(_EditableCard);

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[4],

    '& > div:first-child': {
      display: (props) => (props.focused ? 'block' : 'none'),
    },
  },
  toolbar: {
    '& > button': {
      marginLeft: 'auto',
      display: 'block',
      fontWeight: 700,
      textTransform: 'initial',
    },
  },
  title: {
    ...theme.typography.body1,
    fontWeight: 700,
  },
  content: {
    ...theme.typography.body2,
    fontWeight: 600,
  },
}));
