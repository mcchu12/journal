import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { Loader } from '../components';

const CustomRoute = (props) => {
  const {
    component: Component,
    isAuthenticated,
    isVerifying,
    privateRoute,
    ...rest
  } = props;

  let redirectPath = '';

  if (isVerifying) return <Loader />;

  // Route non-user to sign in page
  if (!isAuthenticated && privateRoute) redirectPath = '/signin';

  // Route user from authentication routes to home
  if (isAuthenticated && !privateRoute) redirectPath = '/';

  return (
    <Route
      {...rest}
      render={(props) =>
        redirectPath ? (
          <Redirect
            to={{ pathname: redirectPath, state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
};

export default connect(mapStateToProps, {})(CustomRoute);
