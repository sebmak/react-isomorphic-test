var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;


var App = require('./scripts/App.jsx');
var Dashboard = require('./scripts/Dashboard.jsx');
var Card = require('./scripts/Card.jsx');


module.exports = (
  <Route handler={App} path="/">
    <Route name={'dashboard'} path={'/'} handler={Dashboard} />
    <Route name={'card'} path={'/card/:id'} handler={Card} />
    <Route name={'dashboard-no-render'} path={'/no-render'} handler={Dashboard} />
  </Route>
);