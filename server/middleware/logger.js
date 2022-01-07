const express = require("express");
const moment = require("moment");

//Simply logs user activity to console.
function logger(req, res, next) {
    console.log(`${req.session.username}: ${req.protocol}://${req.get("host")}${req.originalUrl}:${moment().format()}`);
    next();
}

module.exports = logger;