// test-io-server.js
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 2000;

const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.set("port", PORT);

// Express Middleware for serving static
// files and parsing the request body
app.use(express.static("public"));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

// Create the socket server
//Controllers
var auctionController = require("./Controller/AuctionController")();
app.use("/api/auctions", auctionController);

var biddingController = require("./Controller/BiddingController")();
app.use("/api/bidding", biddingController);

var settingsController = require("./Controller/SettingsController")();
app.use("/api/settings", settingsController);

var usersController = require("./Controller/UserController")();
app.use("/api/users", usersController);

//var io = require('io.io')(PORT);
io.on("connection", function (socket) {
  socket.on("disconnect", onDisconnect);
  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  // Handle a disconnection from the client
  function onDisconnect() {
    console.log("Received: disconnect event from client: " + socket.id);
    // socket.removeListener('test', onTest);
    socket.removeListener("disconnect", onDisconnect);
  }
});

http.listen(app.get("port"), function () {
  var datetime = new Date();
  var message =
    "Server runnning on Port:- " + PORT + ". Started at :- " + datetime;
  console.log(message);
});
