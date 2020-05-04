import React from 'react';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  Box,
  TextField,
  Typography,
  Container,
  Button,
} from '@material-ui/core';

const SignUp = ({ values, handleChange, handleSubmit }) => {
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
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
        <Typography variant="h4" align="center">
          Sign Up
        </Typography>
        {renderForm()}
      </Container>
    </Box>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: (values, form) => {
    console.log(values);
    form.setSubmitting(false);
  },
})(SignUp);

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),

    '& > div': {
      marginBottom: theme.spacing(1.5),
    },
  },
}));
