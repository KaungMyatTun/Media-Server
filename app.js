require('dotenv').config()
let express = require('express'),
    app = express(), 
    path = require('path');

app.use(express.static(path.join('assets')));

app.listen(process.env.PORT, () => {
    console.log("Sever is running at " + process.env.PORT);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/index", (req,res) => {
    res.sendfile(__dirname + "/index.html")
})

app.get('/about', (req, res) => {
    res.sendfile(__dirname + "/about.html")
}) 