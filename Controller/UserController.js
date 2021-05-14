const { json } = require('body-parser');
var express = require('express');
var cors = require('cors');
var router = express.Router();
router.options('*', cors())
var client = require("../connection/connect")();

//check Redis database connection
client.on('connect', () => {
    console.log("connected to redis");
})

var routes = function () {
    
    //GET all users - api/users
    router.route('/')
        .get(function (req, res) {
            try{
                client.hgetall("Users",function(err,biddings){ 
                    if(biddings){
                        return res.status(200).send({
                            error:false,
                            message : "Users data fetched",
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

    //GET user info a particular auction item - api/users/{auctionId}
    router.route('/:id')
        .get(function (req, res) {
            try{
                var id = req.params.id;
                client.hmget("Users",id, function(err,biddings){ 
                    if(biddings){
                        return res.status(200).send({
                            error:false,
                            message : "User data fetched",
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

    //POST new user (create a new users) - api/users
    //Request body has auction Id and users info
    router.route('/')
    .post(function (req, res) {
        
        try{
            var auctionData = "";
            var jsonBody = req.body;
            var id = jsonBody.email;
          
            //Add users info to Users
            client.hmset("Users", id, JSON.stringify(jsonBody), function(err,result){
                biddingsData = jsonBody;
            });
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