const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var client = require("../connection/connect")();
var uuid = require('uuid');

client.on('connect', () => {
    console.log("connected to redis");
})

client.on("error", (error) => {
    console.error(error);
});

var routes = function () {
    
    //GET all auctions - api/auctions
    router.route('/')
        .get(function (req, res) {
            try{
                client.hgetall("Auctions",function(err,auctions){ 
                    if(auctions){
                        return res.status(200).send({
                            error:false,
                            message : "Auctions data fetched",
                            data : auctions
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
    
    //GET data of a particular auction - api/auctions/{id}
    router.route('/:id')
        .get(function (req, res) {
            var auctionData = "";
            try{
                client.hmget("Auctions", req.params.id, function(err,auctions){ 
                    if(auctions){
                        return res.status(200).send({
                            error:false,
                            message : "Auctions data fetched",
                            data : auctions
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
    
    //POST create new auction - api/auctions
    router.route('/')
        .post(function (req, res) {
            try{
                jsonBody = req.body;
                //Generate unique id for Auction ID
                id = uuid.v4();
                jsonBody.auctionId = id;
                client.hmset("Auctions", id, JSON.stringify(jsonBody), function(err,result){
                    if(result == "OK"){
                        return res.status(200).send({
                            error:false,
                            message : "Auctions data created",
                            result : result
                        })                         
                    }
                    else{
                        return res.status(500).send({
                            error:true,
                            message:"Unable to add data",
                            errordata : err
                        })
                    }
                })
            }
            catch(error){
                return res.status(500).send({
                    error:true,
                    message:"Unable to add data",
                    errordata : error
                })
            }               
        });

    //PUT modify auction - api/auctions/{id}
    router.route('/:id')
        .put(function (req, res) {
            try{
                var id = req.params.id;
                client.hmset("Auctions", id, JSON.stringify(jsonBody), function(err,auctions){
                    if(auctions){

                        return res.status(200).send({
                            error:false,
                            message : "Auctions data modified",
                            result : result
                        })                         
                    }
                    else{
                        return res.status(500).send({
                            error:true,
                            message:"Unable to modify data",
                            errordata : err
                        })
                    }
                })
            }   
            catch(error){
                return res.status(500).send({
                    error:true,
                    message:"Unable to nodify data",
                    errordata : error
                })
            }         
        });        

    return router;
};
module.exports = routes;