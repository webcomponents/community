'use strict';

let express = require('express');
let fs = require('fs');

let app = express();

app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});

app.get('/content/:path', function(request, response) {
  fs.readFile('articles/' + request.params.path, 'utf8', function(err, data) {
    if (err) {
      response.status(404).send('Cannot find ' + err.path);
      return;
    }
    data = data.replace(/([^]*<!-- Excerpt -->)/m, '').trim();
    response.status(200).send(data);
  });
});

// Start the server
let server = app.listen(process.env.PORT || '8080', function() {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});

module.exports = server;
