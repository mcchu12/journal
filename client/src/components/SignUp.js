import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import { signUp } from '../actions';

import {
  makeStyles,
  Box,
  TextField,
  Typography,
  Container,
  Button,
  CircularProgress,
} from '@material-ui/core';

const SignUp = ({
  values,
  handleChange,
  handleSubmit,
  isSigningUp,
  errMessage,
}) => {
  const classes = useStyles();

  const renderForm = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
        <TextField
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          fullWidth
          required
          value={values.name}
          onChange={handleChange}
          color="secondary"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={values.email}
          onChange={handleChange}
          color="secondary"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={values.password}
          onChange={handleChange}
          color="secondary"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSigningUp}
          startIcon={
            isSigningUp && (
              <CircularProgress
                size={24}
                variant="indeterminate"
                color="inherit"
              />
            )
          }
        >
          {isSigningUp ? 'Signing Up' : 'Sign Up'}
        </Button>
      </form>
    );
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="xs">
        <Typography variant="h5" align="center">
          Sign Up
        </Typography>
        {renderForm()}
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isSigningUp: state.auth.signUp.isSigningUp,
    errMessage: state.auth.signUp.signUpErr,
  };
};

export default compose(
  connect(mapStateToProps, { signUp }),
  withFormik({
    mapPropsToValues: () => ({ name: '', email: '', password: '' }),
    handleSubmit: (values, form) => {
      form.props.signUp(values);
      form.setSubmitting(false);
    },
  })
)(SignUp);

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),

    '& > div': {
      marginBottom: theme.spacing(1.5),
    },
  },
}));
