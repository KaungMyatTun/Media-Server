require('dotenv').config();
let express = require('express');
let app = express();
let multer = require('multer');
let guestRoute = require('./routes/guestRoutes')(express);
let userRoute = require("./routes/userRoute")(express);

app.use("/", guestRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT);