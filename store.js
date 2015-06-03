'use strict';

var request = require('superagent');
var prefix = require('superagent-prefix')('http://localhost:3000');

var assign = require('object-assign');

var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var _store = {
};

var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
  register: function(req,res){
    Store.request = req;
    Store.response = res;
    return Store;
  },
  init: function(){
    if(typeof window !== 'undefined' && window._store && Object.keys(window._store).length > 0){
      Store.update(window._store);
    } else {
      console.log("Fetching: /api"+window.location.pathname);
      Store.fetch('/api'+window.location.pathname);
    }
  },
  request: undefined,
  response: undefined,
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _store;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  fetch: function(url,callback) {
    if(typeof callback == 'undefined'){
      callback = function() {};
    }
    console.log('fetching...');
    request
      .get(url)
      .use(prefix)
      .set('Accept', 'application/json')
      // .set('Cookie',(typeof(Store.request) !== 'undefined' ? Store.request.headers.cookie : {}))
      .end(function(err, response){
        if(err && err.status >= 500){
          Store.response.status(err.status);
          Store.response.send('Unrecoverable Error!');
        } else if(response.status && response.status==401){
          Store.response.status(401);
          //Log User Out and redirect
          Store.response.send('Unauthorized!');
        } else {
          Store.update(response.body.data);
          callback();
        }
      });
  },

  update: function(data) {
    _.merge(_store, data, function(a, b) {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    });
    Store.emitChange();
  },

  get: function(key) {
    if(typeof key == 'undefined'){
      return _store;
    }
    return _store[key];
  }

})

module.exports = Store;