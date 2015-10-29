'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel/polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var app = (0, _express2['default'])();
var server = _http2['default'].Server(app);
var io = (0, _socketIo2['default'])(server);

app.engine('handlebars', (0, _expressHandlebars2['default'])({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
server.listen(_config2['default'].application.server.port, _config2['default'].application.server.host, function () {
    console.log('server listening at port', _config2['default'].application.server.port);
});
app.use(_express2['default']['static']('dist/frontend'));

app.get('/', function (req, res) {
    res.render('home', { name: 'syaro' });
});

io.on('connection', function (socket) {
    socket.emit('yo', { yo: 'yoyo' });
});