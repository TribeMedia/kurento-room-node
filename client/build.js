/**
 * Created by gqadonis on 8/19/15.
 */
var path = require('path');
var pkg = require('./package.json');
var fs = require('fs');
var browserify = require('browserify');
var reactify = require('reactify');
var boot = require('loopback-boot');

module.exports = function buildBrowserBundle(callback) {
  //var isDevEnv = ~['debug', 'development', 'test'].indexOf(env);

  //var b = browserify({ basedir: __dirname });
  //b.transform(reactify);
  //b.require('./' + pkg.main, { expose: 'app' });

  var bundler = browserify({ basedir: __dirname, entries: ['app.js'], transform: [ reactify ], debug: true, cache: {} });

  //bundler.transform(reactify);
  //bundler.require('./jsx/App.jsx', { expose: 'App'});
  //var stream = bundler.bundle();

  /*try {
    boot.compileToBrowserify({
      appRootDir: __dirname,
      env: env
    }, b);
  } catch(err) {
    return callback(err);
  }*/

  var bundlePath = path.resolve(__dirname, 'browser.bundle.js');
  var out = fs.createWriteStream(bundlePath);


  bundler.bundle()
    .on('error', callback)
    .pipe(out);

  out.on('error', callback);
  out.on('close', callback);
};
