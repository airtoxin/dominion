import 'babel/polyfill';

import http from 'http';
import config from 'config';
import express from 'express';
import socketio from 'socket.io';
import exphbs from 'express-handlebars';

let app = express();
let server = http.Server(app);
let io = socketio(server);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
server.listen(
    config.application.server.port,
    config.application.server.host,
    () => {console.log('server listening at port', config.application.server.port);}
);
app.use(express.static('dist/frontend'));

app.get('/', (req, res) => {
    res.render('home', {name: 'syaro'});
});

io.on('connection', (socket) => {
    socket.emit('yo', {yo: 'yoyo'});
});
