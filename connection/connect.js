const redis = require('redis');

var connect = function()
{
    var client = redis.createClient(
        process.env.REDIS_PORT,
        process.env.REDIS_END_POINT,
        {username: process.env.REDIS_USERNAME,password: process.env.REDIS_PASSWORD}
    );
    
    return client;
};

module.exports = connect;