// let http = require('http');
// let urls = require('url');
// let qs = require('querystring')
// let fs = require('fs')
// require('dotenv').config()

// let responder = (req, res, param) => {
//     res.writeHead(200, { "Content-Type": "text/html" })
//     res.end(param);
// }

// let myFileReader = (filepath, res) => {
//     fs.access(filepath, fs.F_OK, (error) => {
//         if (error) {
//             res.writeHead(404, {"Content-Type": "text/html"});
//             res.end("<h1> File Not Found </h1>");
//         } else {
//             fs.readFile(filepath, (error, data) => {
//                 if (error) throw error;
//                 res.writeHead(200, { "Content-Type": "text/html" });
//                 res.end(data);
//             })
//         }
//     })
// }

// let routes = {
//     "GET": {
//         "/": (req, res) => {
//             let filePath = __dirname + "/index.html";
//             myFileReader(filePath, res);
//         }
//         ,
//         "/home": (req, res) => {
//             let filePath = __dirname + "/home.html";
//             myFileReader(filePath, res);
//         }
//         ,
//         "/index.html": (req, res) => {
//             let filePath = __dirname + "/index.html";
//             myFileReader(filePath, res);
//         },
//         "/about.html": (req, res) => {
//             let filePath = __dirname + "/about.html";
//             myFileReader(filePath, res);
//         }
//     },
//     "POST": {
//         "/": (req, res) =>
//             responder(req, res, `<h1>POST Method => / route</h1> with ${params.query.name}`)
//         ,
//         "/about": (req, res, params) =>
//             responder(req, res, `<h1>POST Method => / about</h1> with ${params.query.name}`)
//         ,
//         "/api/login": (req, res, params) => {
//             let body = "";
//             req.on("data", data => {
//                 body += data;
//                 if (body.length > 1024) {
//                     res.writeHead(403, { "Content-Type": "text/html" });
//                     res.end("<h1> File Size Too Big !</h>");
//                 }
//             })
//             req.on("end", () => {
//                 console.log(query);
//                 res.end();
//             })
//         }
//     },
//     "NA": (req, res) =>
//         responder(req, res, "<h1>Not Found!</h1>")
// }

// let start = (req, res) => {
//     let reqMethod = req.method;
//     let params = urls.parse(req.url, true);
//     let resolveRoute = routes[req.method][params.pathname];
//     if (resolveRoute != null && resolveRoute != undefined) {
//         resolveRoute(req, res, params);
//     } else {
//         routes["NA"](req, res);
//     }
// }

// let server = http.createServer(start);

// server.listen(process.env.PORT, () => {
//     console.log(`Server is running at port ${process.env.PORT}!`);
// });

let http = require('http');
let urls = require('url');
let qs = require('querystring');
let fs = require('fs');
let path = require('path');
require('dotenv').config();

meme = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/js",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif"
}

let checkFileExist = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, (error) => {
            if (error) reject(error);
            resolve(filepath);
        })
    })
}

let readMyFile = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        })
    })
}

let router = (req, res) => {
    let params = urls.parse(req.url, true);
    let oriPath = params.pathname == "/" ? "/index.html" : params.pathname;
    let filepath = __dirname + oriPath;
    let fileExtension = path.extname(oriPath);

    checkFileExist(filepath)
        .then(readMyFile)
        .then(data => {
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(data);
        })
        .catch(error => {
            res.writeHead(404, { "Content-Type": "text/html" })
            res.end("<h1>File Not Found</h1>")
        })
}

let server = http.createServer(router);

server.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}!`);
});