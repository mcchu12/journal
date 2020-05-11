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
  ({ placeholder, className, name, singleLine, editable = false }, ref) => {
    const [, meta, helpers] = useField(name);
    const [isEmpty, setIsEmpty] = useState(true);
    const elRef = useRef();

    const classes = useStyles({ isEmpty });

    useImperativeHandle(ref, () => ({
      // Reset field
      reset() {
        helpers.setValue('');
        elRef.current.innerText = '';
        if (!isEmpty) {
          setIsEmpty(true);
        }
      },

      // Get field value
      getValue() {
        return elRef.current.innerHTML.toString();
      },
    }));

    // Set field configs
    useEffect(() => {
      if (meta.initialValue) {
        setIsEmpty(false);
      }
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
    }, [singleLine, meta.initialValue]);

    const onInput = (e) => {
      const value = e.currentTarget.innerText;
      helpers.setValue(e.currentTarget.innerText);

      if (!value && !isEmpty) {
        setIsEmpty(true);
      } else if (value && isEmpty) {
        setIsEmpty(false);
      }
    };

    return (
      <div className={`${classes.root} ${className}`}>
        <div>{placeholder}</div>
        <div
          ref={elRef}
          contentEditable={editable}
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
      display: (props) => (props.isEmpty ? 'block' : 'none'),
    },

    '& > div:last-child': {
      position: 'relative',
      zIndex: 5,
    },
  },
}));
