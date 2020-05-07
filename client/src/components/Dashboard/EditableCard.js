import React, { useEffect, useState, useRef } from 'react';
import { withFormik } from 'formik';
import { makeStyles, Button } from '@material-ui/core';

import { EditableField } from './EditableField';

const _EditableCard = ({ handleSubmit }) => {
  const [focused, setFocus] = useState(false);

  const elRef = useRef();
  const classes = useStyles({ focused });

  useEffect(() => {
    const handleClick = (e) => {
      if (elRef.current.contains(e.target)) {
        if (!focused) {
          setFocus(true);
        }
        return;
      }

      setFocus(false);
    };

    document.addEventListener('mousedown', handleClick, false);

    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, [focused]);

  return (
    <div ref={elRef}>
      <div className={classes.card}>
        <EditableField
          name="title"
          placeholder="Title"
          className={classes.title}
        />
        <EditableField
          name="content"
          placeholder="Take a note..."
          className={classes.content}
        />

        {focused && (
          <div className={classes.toolbar}>
            <Button color="secondary" onClick={handleSubmit}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const EditableCard = withFormik({
  mapPropsToValues: () => ({
    title: '',
    content: '',
  }),
  handleSubmit: (values, form) => {
    console.log(values);
    form.setSubmitting(false);
  },
})(_EditableCard);

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
    fontWeight: 600,
  },
  content: {
    ...theme.typography.body2,
    fontWeight: 600,
  },
}));
