/**
 * Created by gqadonis on 8/28/15.
 */
import React from 'react';
import Router from 'react-router';

import {
  App
  ,	IndexPage
  ,	UserPage
//,	ToDoPage
  ,	LoginPage
  ,	RegisterPage
} from './jsx/components';

const Route = Router.Route;
const router = Router.create({
  routes: [
    <Route handler={App}>
      <Route path="/" handler={IndexPage}></Route>
      <Route path="/me" handler={UserPage}></Route>
      <Route path="/login" handler={LoginPage}></Route>
      <Route path="/register" handler={RegisterPage}></Route>
    </Route>
  ]
});

export default router;
