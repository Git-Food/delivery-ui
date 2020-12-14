/* eslint-disable prettier/prettier */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { privateRoutes, regularRoutes } from './routes.js';
import PrivateRoute from './PrivateRoute';
import Restaurants from './Restaurants';

export default function Contents() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Restaurants} />
      {/* Some pages require users to be logged in to view*/}
      {privateRoutes.map(attrs => (
        <PrivateRoute {...attrs} key={attrs.path} />
      ))}
      {/* Some pages do not require users to be logged in to view */}
      {regularRoutes.map(attrs => (
        <Route {...attrs} key={attrs.path} />
      ))}
    </Switch>
  );
}
