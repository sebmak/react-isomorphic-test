var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Store = require('../store.js');

module.exports = React.createClass({
  mixins: [ Router.State ],
  getInitialState: function(){
    return {
      card: this.findCard(Store.get('cards'))
    }
  },
  _onChange: function(){
    this.setState({
     card: this.findCard(Store.get('cards'))
    })
  },
  findCard: function(cards){
    var card = {};
    for(var i = 0; i < cards.posts.length; i++){
      if(cards.posts[i].id==this.getParams().id){
        card = cards.posts[i];
      }
    }
    return card;
  },
  transitionOut: function(){
    return this.refs.header.getDOMNode().animate([
      {height: '100px'},
      {height: '400px'}
    ],250);
  },
  statics: {
    willTransitionFrom: function (transition, component, callback) {
      new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
        component.transitionOut().onfinish = function(e) {
          resolve();
        }
      }).then(callback);
    }
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  render: function(){
    if(typeof this.state.card=='undefined'){
      return (
        <h1>Loading</h1>
      )
    }
    return (
      <div className="page">
        <header ref="header">

        </header>
        <img src={this.state.card.image}/>
        <p>{this.state.card.text}</p>
        <Link component="button" to={'/'}>Back</Link>
      </div>
    )
  }
})