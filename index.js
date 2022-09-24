let http = require('http');
let urls = require('url');
require('dotenv').config()

let routes = {
    "GET": {
        "/": (req, res, param) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1>Get Method => / route with ${param.query.name}</h1>`)
        },
        "/home": (req, res, param) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1>Get Method => / route</h1> with ${param.query.name}`)
        }
    },
    "POST": {
        "/": (req, res, param) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1>POST Method => / route</h1> with ${param.query.name}`)
        },
        "/about": (req, res, param) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1>POST Method => /about</h1> with ${param.query.name}`)
        }
    },
    "NA": (req, res, param) => {
        res.writeHead(404);
        res.end("<h1>Not Found!</h1>")
    }
}

let start = (req, res) => {
    let reqMethod = req.method;
    let param = urls.parse(req.url, true);
    let resolveRoute = routes[req.method][param.pathname];
    if (resolveRoute != null && resolveRoute != undefined) {
        resolveRoute(req, res, param);
    } else {
        routes["NA"](req,res, param);
    }
}

let server = http.createServer(start);

server.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}!`);
});