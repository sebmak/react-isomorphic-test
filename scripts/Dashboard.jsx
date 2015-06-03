var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Store = require('../store.js');

var MasonryMixin = require('react-masonry-mixin');
var cx = require('classnames');

var Card = React.createClass({
  getInitialState: function(){
    return {
      active: false
    }
  },
  componentDidMount: function(){
  },
  render: function(){
    var classes = cx({
      'card':true,
      'card-active':this.state.active
    })
    return (
      <div className={classes}>
        <img ref="image" src={'http://www.placehold.it/300x'+(200*this.props.data.height)} width="300" height={(200*this.props.data.height)} />
        <img className="card-user" src="http://www.placehold.it/50x50/0000ff/ffffff" />
        <Link to={'card'} params={{id:this.props.data.id}}>{this.props.data.title}</Link>
        <p>{this.props.data.text}</p>
      </div>
    )
  }
})

var masonryOptions = {
  transitionDuration: 0,
  isFitWidth: true,
  gutter:10,
  itemSelector: '.card'
};

module.exports = React.createClass({
  mixins: [MasonryMixin('container', masonryOptions), Router.State],
  getInitialState: function(){
    return {
      cards: Store.get('cards')
    }
  },
  transitionOut: function(){
    this.refs.header.getDOMNode().animate([
      {height: '400px'},
      {height: '100px'}
    ],250);
    
    document.body.scrollTop = 0;

    // $('html, body').animate({scrollTop : 0},10);

    return this.refs.container.getDOMNode().animate([
      {opacity: 1},
      {opacity: 0}
    ], 250);
  },
  transitionIn: function(){
    return this.refs.container.getDOMNode().animate([
      {opacity: 0},
      {opacity: 1}
    ], 250);
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
  _onChange: function(){
    this.setState({
     cards: Store.get('cards')
    })
  },
  componentDidMount: function() {
    // this.transitionIn();
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  mapCards: function(card){
    return <Card key={card.id} data={card} />
  },
  render: function(){
    if(typeof this.state.cards == 'undefined'){
      var cards = <h1>Loading...</h1>;
    } else {
      var cards = this.state.cards.posts.map(this.mapCards);
    }
    return (
      <div className="dashboard">
        <header ref="header">

        </header>
        <div ref="container" className="container">
          {cards}
        </div>
      </div>
    )
  }
})