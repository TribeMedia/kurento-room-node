/**
 * Created by gqadonis on 8/19/15.
 */
var path = require('path');
var pkg = require('./package.json');
var fs = require('fs');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var boot = require('loopback-boot');

module.exports = function buildBrowserBundle(callback) {
  //var isDevEnv = ~['debug', 'development', 'test'].indexOf(env);

  //var b = browserify({ basedir: __dirname });
  //b.transform(reactify);
  //b.require('./' + pkg.main, { expose: 'app' });

  var bundler = browserify({ basedir: __dirname, entries: ['index.js'], transform: [ babelify, reactify ], extensions: ['.js', '.jsx'],
    grep: /\.jsx?$/, debug: true, cache: {} });

  //bundler.transform(reactify);
  //bundler.require('./jsx/App.jsx', { expose: 'App'});
  //var stream = bundler.bundle();

  bundler.require(path.resolve(__dirname, 'loopback/index.js'),
    {expose: 'lbclient'});
  try {
    boot.compileToBrowserify({appRootDir: path.resolve(__dirname,
      'loopback')}, bundler);
  } catch(e) {
    throw e;
  }

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
