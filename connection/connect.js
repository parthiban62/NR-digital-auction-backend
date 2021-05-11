const redis = require('redis');

var connect = function()
{
    var client = redis.createClient(
        17782,
        "redis-17782.c266.us-east-1-3.ec2.cloud.redislabs.com",
        {username:'default',password:'xvNlTffymqLZXhIlOecFXNhfaZSnGYhS'}
    );
    
    return client;
};

module.exports = connect;