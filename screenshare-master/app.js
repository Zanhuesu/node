// var http = require('http');
// var express = require('express');
// var app = express();

// var server = http.createServer(app).listen(3001);
// // var io = require('socket.io').listen(3001);


// // var server = http.createServer(app);
// // var io = require('socket.io').listen(server);
// const io = require('socket.io')(server);
// server.listen(3001);
// io.set('log level', 1);
// io.set('transports', ['websocket']);

// app.configure(function(){
//     app.use(function(req, res, next) {
//         res.setHeader("X-UA-Compatible", "chrome=1");
//         return next();
//     });
//     app.use(express.static(__dirname + '/public'));
// });
// io.sockets.on('connection', function(socket) {
//     socket.on('CreateSession', function(msg){
//         socket.join(msg);
//     });
//     socket.on('PageChange', function(msg){
//         socket.join(msg);
//         io.sockets.in(msg).emit('SessionStarted', '');
//         console.log('PageChange');
//     });
//     socket.on('JoinRoom', function(msg){
//         socket.join(msg);
//         io.sockets.in(msg).emit('SessionStarted', '');
//     });
//     socket.on('ClientMousePosition', function(msg){
//         socket.broadcast.to(socket.room).emit('ClientMousePosition', {PositionLeft:msg.PositionLeft, PositionTop:msg.PositionTop});
//     });
//     socket.on('AdminMousePosition', function(msg){
//         socket.broadcast.to(msg.room).emit('AdminMousePosition', {PositionLeft:msg.PositionLeft, PositionTop:msg.PositionTop});
//     });
//     socket.on('changeHappened', function(msg){
//         socket.broadcast.to(msg.room).emit('changes', msg.change);
//     });
//     socket.on('DOMLoaded', function(msg){
//         socket.broadcast.to(msg.room).emit('DOMLoaded', '');
//     });
// });
// app.listen(3000);


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.configure(function(){
    app.use(function(req, res, next) {
        res.setHeader("X-UA-Compatible", "chrome=1");
        return next();
    });
    app.use(express.static(__dirname + '/public'));
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});