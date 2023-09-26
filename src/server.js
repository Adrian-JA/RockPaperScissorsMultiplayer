const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const socket = require("./socket.js");

app.use(express.static(path.join(__dirname, "/public")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public"));
});

socket(io);

httpServer.listen(process.env.PORT || 3000, () => {
    console.log("port 3000");
});
