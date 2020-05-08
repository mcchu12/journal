import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core';

export const EditableField = forwardRef(
  ({ placeholder, className, name, singleLine }, ref) => {
    const [, meta, helpers] = useField(name);
    const [empty, setEmpty] = useState(true);
    const elRef = useRef();

    const classes = useStyles({ empty });

    useEffect(() => {
      if (singleLine) {
        const el = elRef.current;

        const handleKeydown = (e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
          }
        };

        el.addEventListener('keydown', handleKeydown, false);

        return () => {
          el.removeEventListener('keydown', handleKeydown, false);
        };
      }

      return;
    }, [singleLine]);

    useImperativeHandle(ref, () => ({
      reset() {
        helpers.setValue('');
        elRef.current.innerText = '';
        if (!empty) {
          setEmpty(true);
        }
      },
    }));

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
          ref={elRef}
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
  }
);

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
