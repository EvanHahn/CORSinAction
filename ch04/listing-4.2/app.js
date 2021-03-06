var express = require('express');

var POSTS = {
  '1': {'post': 'This is the first blog post.'},
  '2': {'post': 'This is the second blog post.'},
  '3': {'post': 'This is the third blog post.'}
};

var handleCors = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1111');
  next();
};

var SERVER_PORT = 9999;
var serverapp = express();
serverapp.use(express.static(__dirname));
serverapp.use(handleCors);
serverapp.get('/api/posts', function(req, res) {
  res.json(POSTS);
});
serverapp.delete('/api/posts/:id', function(req, res) {
  delete POSTS[req.params.id];
  res.send(204);
});
serverapp.listen(SERVER_PORT, function() {
  console.log('Started server at http://127.0.0.1:' + SERVER_PORT);
});

var CLIENT_PORT = 1111;
var clientapp = express();
clientapp.use(express.static(__dirname));
clientapp.listen(CLIENT_PORT, function() {
  console.log('Started client at http://localhost:' + CLIENT_PORT);
});
