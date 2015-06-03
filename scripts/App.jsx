var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var request = require('superagent');
var Link = Router.Link;
var cx = require('classnames');

module.exports = React.createClass({
  mixins: [ Router.State ],
  render: function(){
    return (
      <div>
        <RouteHandler />
      </div>
    )
  }
})