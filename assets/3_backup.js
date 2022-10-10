require('dotenv').config();
let express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    hogan = require('hogan-express'),
    { Server } = require('socket.io'),
    io = new Server(server),
    helper = require('./bmlibby');


app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "assets")))

io.on('listening', function () {
    console.log(`listening on port ${io.server.PORT}`);
})

app.get('/login', (req, res) => {
    res.render('index');
})

/**
  #sending to all users
  io.emit("key", "val");

  #send message only to sender client
  socket.emit("key", "val");

  #send to all listener except sender
  socket.broadcast.emit("chat-data", username + " : " + data);

  #send message to certain user
  io.to(socket.id).emit();

  #send to specifi socket-id (specific user)
  socket.broadcast.to(socketid).emit("chat-data", username + " : " + data);
 */

let userMap = new Map();
let room1 = "public";
let room2 = "private";

io.sockets.on('connection', (socket) => {
    socket.on('login', data => {
        socket.username = data;
        userMap.set(socket.username, socket.id);
        // io.to(socket.id).emit('login-success', true);
        // socket.join(room1);
        if(socket.username == 'w' || socket.username == 'x'){
            socket.join(room1);
            socket.userroom = room1;
            socket.emit('login-success', true);
        }else{
            socket.join(room2);
            socket.userroom = room2;
        }

    }); 
    socket.on('msg', data => {
        // io.emit('income-msg', socket.username + ": " + data); 
        io.in(socket.userroom).emit('income-msg', socket.username + " : " + data);
    })
})


server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})