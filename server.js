const express = require("express");
const cors = require("cors");

const usersRouter = require("./users/usersRouter");
const authRouter = require("./auth/authRouter");
const restricted = ("./auth/restrictedMiddleware");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});


module.exports = server;