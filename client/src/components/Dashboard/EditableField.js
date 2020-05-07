import React, { useState } from 'react';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core';

export const EditableField = ({ placeholder, className, name }) => {
  const [, meta, helpers] = useField(name);
  const [empty, setEmpty] = useState(true);
  const classes = useStyles({ empty });

  const onInput = (e) => {
    const value = e.currentTarget.innerText;
    helpers.setValue(e.currentTarget.innerText);

    if (!value && !empty) {
      setEmpty(true);
    } else if (value && empty) {
      setEmpty(false);
    }
  };

  return (
    <div className={`${classes.root} ${className}`}>
      <div>{placeholder}</div>
      <div
        contentEditable
        role="textbox"
        aria-label={placeholder}
        aria-multiline
        tabIndex={0}
        onInput={onInput}
        dangerouslySetInnerHTML={{ __html: meta.initialValue }}
      ></div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 0),
    position: 'relative',

    '& > div': {
      outline: 'none',
    },

    '& > div:first-child': {
      position: 'absolute',
      zIndex: -1,
      display: (props) => (props.empty ? 'block' : 'none'),
    },
  },
}));
