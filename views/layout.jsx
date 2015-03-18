var React = require('react');

var Layout = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <title>Heatmap Calendar Demo</title>
          <link rel="stylesheet" href="style.css" />
     
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = Layout;
