/* ----------
 * Rendering our component server side
 */
var React = require('react');
var Router = require('react-router');
require('node-jsx').install({harmony: true})

// var Routes = require('./routes.jsx');

/* ----------
 * Serving up the rendered template
 */
var express = require('express');
var app = express();

var Routes = require('./routes.jsx');
var Html = require('./scripts/Html.jsx');
var Store = require('./store.js');
var sleep = require('sleep');

app.use(express.static(__dirname + '/public'));

app.get('/no-render',function(req, res) {
  console.log('No Render');
  res.send('<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(Html)));

});

app.get('/*',function(req, res) {
  Store.register(req, res);


  var render = function(){
    Router.run(Routes, req.path, function(Handler) {
      var content = React.renderToString(React.createElement(Handler,{}));
      res.send('<!DOCTYPE html>' + React.renderToStaticMarkup(React.createElement(Html, {content:content,data:Store.get()})));
    });
  }

  Store.fetch('/api'+req.path,render);
});


app.listen(3000, function() {
  console.log("Listening on port 3000");
});
