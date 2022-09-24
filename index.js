let http = require('http');
let urls = require('url');
let qs = require('querystring')
require('dotenv').config()

let responder = (req, res, param) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(param);
}

let routes = {
    "GET": {
        "/": (req, res) =>
            responder(req, res, `<h1>Get Method => / route with ${params.query.name}</h1>`)
        ,
        "/home": (req, res) =>
            responder(req, res, `<h1>Get Method => / route</h1> with ${params.query.name}`)
    },
    "POST": {
        "/": (req, res) =>
            responder(req, res, `<h1>POST Method => / route</h1> with ${params.query.name}`)
        ,
        "/about": (req, res, params) =>
            responder(req, res, `<h1>POST Method => / about</h1> with ${params.query.name}`)
        ,
        "/api/login": (req, res, params) => {
            let body = "";
            req.on("data", data => {
                body += data;
            })
            req.on("end", () => {
                let query = qs.parse(body);

                console.log(query.email);
                res.end();
            })
        }
    },
    "NA": (req, res) =>
        responder(req, res, "<h1>Not Found!</h1>")
}

let start = (req, res) => {
    let reqMethod = req.method;
    let params = urls.parse(req.url, true);
    let resolveRoute = routes[req.method][params.pathname];
    if (resolveRoute != null && resolveRoute != undefined) {
        resolveRoute(req, res, params);
    } else {
        routes["NA"](req, res);
    }
}

let server = http.createServer(start);

server.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}!`);
});