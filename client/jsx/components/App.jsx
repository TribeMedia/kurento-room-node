import React from 'react';
import { RouteHandler } from 'react-router';
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

export default class App extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func
  }

  childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor ( props, context ) {
    super( props, context );

    this.props = props;
    this.state = { };
    this.context = context;
  }

  componentWillReceiveProps ( nextProps ) { }
  componentReceiveProps ( ) { }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  }

  render ( ) {
    return (
      <div>
        <RouteHandler {...this.props} />
      </div>
    );
  }

}
