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

const SignIn = ({ values, handleChange, handleSubmit }) => {
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
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
          Sign In
        </Typography>
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

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: (values, form) => {
    console.log(values);
    form.setSubmitting(false);
  },
})(SignIn);

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),

    '& > div': {
      marginBottom: theme.spacing(1.5),
    },
  },
}));
