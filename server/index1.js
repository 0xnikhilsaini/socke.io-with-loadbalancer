const express = require('express');
const app = express();
const server = require('http');
const io = require('socket.io')(server);
const redis = require('socket.io-redis');
const port = process.env.PORT || 3000;
const serverName = process.env.SERVER_NAME || 'no_name';

io.adapter(redis({ host: 'redis', port: 6379 }));


app.use(express.static(__dirname + '/public'));
app.head('/health', (req,res) => {
    res.sendStatus(200);
})


app.listen(port, () => {
    console.log(`server is listening on port ${port} with name ${serverName}`);
})



const connectionEventHandler = (socket) => {
    console.log(socket.id);
}

const disconnectEventHandler = () => {
    console.log(socket.id);
}


io.on('connection', connectionEventHandler);
io.on('disconnect', disconnectEventHandler)