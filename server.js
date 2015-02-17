var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var connections = 0;

io.on('connection', function(socket){
    connections += 1;
    var user = "user" + connections;
    io.emit('chat message', user + " connected");
    socket.on('chat message', function(msg){
        io.emit('chat message', Date() + " " + user + ": " + msg);
    });
    socket.on('disconnect', function(){
        io.emit('chat message', "user disconnect");
    });
});

http.listen(3000, function(){
    console.log("listening on 3000");
});