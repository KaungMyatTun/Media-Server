require('dotenv').config();
let express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    hogan = require('hogan-express'),
    {Server} = require('socket.io'), 
    io = new Server(server);

app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "assets")))

io.on('listening', function(){
    console.log(`listening on port ${io.server.PORT}`);
})

app.get('/login', (req,res)=>{
    res.render('index');
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})