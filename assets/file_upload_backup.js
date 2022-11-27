require('dotenv').config();
let express = require('express');
let multer = require('multer');
app = express(),
    upload = multer();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: storage });

/// ----- single image upload ------
app.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(req);
    res.send(req.file.originalname);
});

// ========= multiple images upload ============
app.post('/multiupload', upload.array('images', 2), function (req, res, next) {
    console.log(req.files.length);
    res.send(req.files);
});

app.listen(process.env.PORT);