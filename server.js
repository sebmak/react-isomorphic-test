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


app.get('/api/*', function(req, res) {
  sleep.usleep(300);
  res.setHeader('Content-Type', 'application/json');
  res.send({data:{
    cards: {
      posts: [
        {id:1, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"Setifera pinguitude unlensed",height:3},
        {id:2, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"rubefaction guama zoonule",height:1},
        {id:3, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"unextenuating dilatatory superofficiousness",height:3},
        {id:4, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"firm precut boucharde",height:1},
        {id:5, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"osteodiastasis bandiness peachify",height:1},
        {id:6, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"bool alienor Arabic",height:1},
        {id:7, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"nonfeldspathic subness Budh",height:2},
        {id:8, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"cyphonautes thoroughwax proresearch",height:3},
        {id:9, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"cest unblenching necrophilistic",height:3},
        {id:10, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"Peripatetic submember pantherlike",height:1},
        {id:11, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"subprofessoriate bluejack black",height:3},
        {id:12, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"overdunged nundinal masticate",height:2},
        {id:13, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"cotylosacral syndesis dadenhudd",height:3},
        {id:14, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"unjustled cockleboat exsputory",height:2},
        {id:15, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"preincarnate houndfish fluttering",height:3},
        {id:16, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"Hunnish smearer semiellipse",height:1},
        {id:17, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"overdemocracy knock tailhead",height:3},
        {id:18, text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",title:"egoistical unprudent pensionable",height:1},
      ]
    }
  }});
});
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