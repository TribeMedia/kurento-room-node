var loopback = require('loopback');
var boot = require('loopback-boot');

var fs = require('fs');
var hbs = require('express-hbs')

var app = module.exports = loopback();

var path = require('path');

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layouts/layout.hbs',
  layoutsDir: __dirname + '/views/layouts'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(loopback.static(path.resolve(__dirname, '../client')));

var buildBrowserBundle = require('../client/build');
buildBrowserBundle(function(err) {
  if (err) {
    throw err;
  }
});

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Rooms for Node'
  });
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
