const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const session = require("express-session");
const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//sets up session middleware
app.use(session({
    name:'session-id',
    secret:'0^LaPLk)_YWgSn}VS@=>&8r&MiYDkP',
    saveUninitialized: false,
    resave: false,
}))

//middleware, routes, and api loader
app.use("/auth", require("./middleware/auth"));
app.use("/add_user", require("./middleware/add_user"));
app.use("/get_file", require("./api/get_file"));
app.use("/user_info", require("./api/public_user_info"));
app.use(require("./routes"));
//app.use(logger); will make changes to this in due course.

//port seup
const PORT = process.env.PORT || 3001;

//request listener
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
