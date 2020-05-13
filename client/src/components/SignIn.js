import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';

import { signIn, clearSignInErr } from '../actions';

import {
  makeStyles,
  Box,
  TextField,
  Typography,
  Container,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

const _SignIn = ({
  values,
  handleChange,
  handleSubmit,
  isSigningIn,
  errMessage,
  clearSignInErr,
}) => {
  const classes = useStyles();

  const renderForm = () => {
    return (
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
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
          disabled={isSigningIn}
          startIcon={
            isSigningIn && (
              <CircularProgress
                size={24}
                variant="indeterminate"
                color="inherit"
              />
            )
          }
        >
          {isSigningIn ? 'Signing In' : 'Sign In'}
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
          Sign In
        </Typography>
        {errMessage && (
          <Alert severity="error" onClose={() => clearSignInErr()}>
            {errMessage}
          </Alert>
        )}
        {renderForm()}

        <Link to="/signup">
          <Button fullWidth color="secondary">
            Create new account
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isSigningIn: state.auth.signIn.isSigningIn,
    errMessage: state.auth.signIn.signInErr,
  };
};

export const SignIn = compose(
  connect(mapStateToProps, { signIn, clearSignInErr }),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit: (values, form) => {
      form.props.signIn(values);
      form.setSubmitting(false);
    },
  })
)(_SignIn);

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),

    '& > div': {
      marginBottom: theme.spacing(1.5),
    },
  },
}));
