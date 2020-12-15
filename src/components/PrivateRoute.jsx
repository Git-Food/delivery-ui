import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../store/AuthContext';

{
  /* If user is logged in, then redirect to component
  Otherwise, redirect to login page*/
}
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}></Route>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.object,
};
