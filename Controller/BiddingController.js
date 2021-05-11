const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var client = require("../connection/connect")();

//check Redis database connection
client.on('connect', () => {
    console.log("connected to redis");
})

var routes = function () {
    
    //GET all biddings - api/bidding
    router.route('/')
        .get(function (req, res) {
            try{
                client.hgetall("Biddings",function(err,biddings){ 
                    if(biddings){
                        return res.status(200).send({
                            error:false,
                            message : "Biddings data fetched",
                            data : biddings
                        })
                    }
                    else{
                        return res.status(500).send({
                            error:true,
                            message:"Unable to fetch data"
                        })
                    }
                })
            }
            catch(error){
                return res.status(500).send({
                    error:true,
                    message:"Unable to fetch data"
                })
            }                    
        });

    //GET bidding info a particular auction item - api/bidding/{auctionId}
    router.route('/:id')
        .get(function (req, res) {
            try{
                var id = req.params.id;
                client.hmget("Biddings",id, function(err,biddings){ 
                    if(biddings){
                        return res.status(200).send({
                            error:false,
                            message : "Biddings data fetched",
                            data : biddings
                        })
                    }
                    else{
                        return res.status(500).send({
                            error:true,
                            message:"Unable to fetch data"
                        })
                    }
                })
            }
            catch(error){
                return res.status(500).send({
                    error:true,
                    message:"Unable to fetch data"
                })
            }                    
        });

    //POST new bidding (create a new bidding) - api/bidding
    //Request body has auction Id and bidding info
    router.route('/')
    .post(function (req, res) {
        
        try{
            var auctionData = "";
            jsonBody = req.body;
            id = jsonBody.auctionId;
            var currentBid = jsonBody.currentBid;
            console.log(id);
            //Add bidding info to Biddings
            client.hmset("Biddings", id, JSON.stringify(jsonBody), function(err,result){
                biddingsData = jsonBody;
            });
            //Get auction info for that auctionId
            client.hmget("Auctions", id, function(err,auctions){ 
                if(auctions){
                    auctionData = JSON.parse(auctions);
                    auctionData.currentBid = currentBid;                                                               
                }
                //Update auctions with new Current Bid amount
                client.hmset("Auctions", id, JSON.stringify(auctionData), function(err,result){
                })
                return res.status(200).send({
                    error:false,
                    message : "Biddings data created"
                }) 
            })
        }
        catch(error){
            return res.status(500).send({
                error:true,
                message:"Unable to add data",
                errordata : error
            })
        }   
        
    })
    
    return router;
};
module.exports = routes;