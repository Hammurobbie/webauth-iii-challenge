const express = require("express");

const cors = require("cors");

const server = express();

const session = require("express-session");

server.use(express.json());

server.use(cors());

const authRouter = require("./Auth/authRouter");

server.use(
  session({
    name: "screwball",
    secret: "tits mcgee",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false
    },
    httpOnly: false,
    resave: false,
    saveUninitialized: false
  })
);

server.use("/api/auth", authRouter);

module.exports = server;
