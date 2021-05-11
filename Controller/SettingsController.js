const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var client = require("../connection/connect")();

//check Redis database connection
client.on('connect', () => {
    console.log("connected to redis");
})

var routes = function () {
    //GET settings - api/settings
    router.route('/')
    .get(function (req, res) {
        try{
            client.get("ProfileSettings",function(err,result){ 
                if(result){
                    return res.status(200).send({
                        error:false,
                        message : "Settings fetched",
                        data : result
                    })
                }
                else{
                    return res.status(500).send({
                        error:true,
                        message:"Unable to fetch settings"
                    })
                }
            })
        }
        catch(error){
            return res.status(500).send({
                error:true,
                message:"Unable to fetch settings"
            })
        }                    
    });

    //POST settings (create or modify settings) - api/settings
    router.route('/')
    .post(function (req, res) {
        try{
            var jsonBody = req.body;
            client.set("ProfileSettings",JSON.stringify(jsonBody), function(err,result){ 
                if(result){
                    return res.status(200).send({
                        error:false,
                        message : "Settings added",
                        data : result
                    })
                }
                else{
                    return res.status(500).send({
                        error:true,
                        message:"Unable to add settings"
                    })
                }
            })
            
        }
        catch(error){
            return res.status(500).send({
                error:true,
                message:"Unable to add settings",
                err : error
            })
        }                    
    });

    return router;
}
module.exports = routes;