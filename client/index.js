/**
 * Created by gqadonis on 8/19/15.
 */

import React from 'react/addons';
import Router from './router';

var injectTapEventPlugin = require('react-tap-event-plugin');

window.React = React;

injectTapEventPlugin();

// init router
Router.run( function( Handler, state ) {
  React.render( (
    <Handler {...state} />
  ), document.body );
} );
