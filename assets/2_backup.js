require('dotenv').config()
let express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    hogan = require('hogan-express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', hogan);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    res.render('index');
})

app.get("/index", (req, res) => {
    // res.sendFile(__dirname + "/index.html")
    res.render('index');
})

app.get('/about', (req, res) => {
    // res.sendFile(__dirname + "/about.html")
    res.render('about');
})

// -------------- getting params -------------------
app.get('/api/post/:id', (req, res) => {
    let id = req.params.id;
    res.send(id);
})

//  -------------- getting query params --------------
app.get('/api/user', (req, res) => {
    let name = req.query.name;
    let password = req.query.password;
    res.send(`name ${name} and password ${password}`);
})

// -------------- getting form data ----------------
app.get('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    res.send(`email ${email} and password ${password}`);
})

app.listen(process.env.PORT, () => {
    console.log("Sever is running at " + process.env.PORT);
})