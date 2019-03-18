const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/chathub', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
  app.use(proxy('/sockjs-node', { target: 'ws://localhost:5000/' }));
};