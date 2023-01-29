// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
var port = process.env.PORT || 3000;
var serverName = process.env.SERVER_NAME || 'no_name';

io.adapter(redis({ host: 'redis', port: 6379 }));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
    console.log('Hello, I\'m %s, how can I help?', serverName);
});


app.use(express.static(__dirname + '/public'));


app.head('/health', function (req, res) {
    res.sendStatus(200);
});


io.on('connection', function (socket) {

    console.log(`A user connected with id: ${socket.id} , on server ${serverName}`);
    socket.broadcast.emit('userConnected', `A user connected with id: ${socket.id} , on server ${serverName}`);


    socket.broadcast.on('disconnect', function () {
        console.log(`A user disconnect with id: ${socket.id} , from server ${serverName}`);
        socket.emit('userDosconnected', `A user disconnect with id: ${socket.id} , from server ${serverName}`);
    });
});
