// test-io-server.js
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 2000;

const bodyParser = require('body-parser');
const http = require('http').Server(app);
const socket = require('socket.io')(http);

app.set('port', PORT);

// Express Middleware for serving static
// files and parsing the request body
app.use(express.static('public'));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

// Create the socket server
//Controllers
var auctionController = require('./Controller/AuctionController')();
app.use("/api/auctions", auctionController);

var biddingController = require('./Controller/BiddingController')();
app.use("/api/bidding", biddingController);

var settingsController = require('./Controller/SettingsController')();
app.use('/api/settings', settingsController);

//var socket = require('socket.io')(PORT);
socket.on('connection', function(client) {

   client.on('test', onTest);
    client.on('disconnect', onDisconnect);

    // Handle a test event from the client
    function onTest(data) {
        console.log('Received: "' + data + '" from client: ' + client.id);
        client.emit('test', "Cheers, " + data);
    }
    
    // Handle a disconnection from the client
    function onDisconnect() {
        console.log('Received: disconnect event from client: ' + client.id);
        client.removeListener('test', onTest);
        client.removeListener('disconnect', onDisconnect);
    }
});

http.listen(app.get('port'), function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- "+ PORT +". Started at :- " + datetime;
    console.log(message);
});