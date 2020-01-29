var express = require('express');
var app = express();

// import sociket library and instantiate it right away
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// attach out chat server to our app
io.attach(server);

// wait for someone to connect then set up connection between client and server
io.on('connection', function(socket) { // soecket is your connection
    console.log('a user has connected');
    socket.emit('connected', {sID: socket.id, message: "new connection"});

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    })
}) 