var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function(){
    return {
      csrf: '',
      data: {},
      content:"<h1>Loading...</h1>"
    }
  },
  render: function(){
    var content = '<h1 style="color:red">Script Loading</h1>'+this.props.content;
    return (
      <html>
        <head>
          <title>Dot Net Test</title>
          <link rel="stylesheet" type="text/css" href="/css/main.css" />
          <script type="text/javascript" src="/js/client.js" />
          <meta name="csrf-token" content={this.props.csrf} />
          <script dangerouslySetInnerHTML={{__html: "window._store = "+JSON.stringify(this.props.data)}} />
        </head>
        <body dangerouslySetInnerHTML={{__html: content}} />
      </html>
    )
  }
})