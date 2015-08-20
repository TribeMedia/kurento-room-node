var React = require('react/addons');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Main = require('./components/Main.jsx'); // Our custom react component

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main app react component into the document body.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

module.exports = {
  start: function() {
    React.render(<Main />, document.body);
  }
}
