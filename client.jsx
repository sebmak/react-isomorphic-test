var React = require('react');
var Router = require('react-router');
var Routes = require('./routes.jsx');
var Store = require('./store.js');

document.addEventListener("DOMContentLoaded", function(event) { 
  setTimeout(function(){
    Store.init();
    Router.run(Routes, Router.HistoryLocation, function(Handler,state) {
      React.render(<Handler />,document.body);
    });
  }, 5000);
});