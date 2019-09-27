var mongoose  = require('mongoose'),
    dotenv    = require('dotenv').config({path: './.env'});

setTimeout(function(){
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

    mongoose.connection.dropCollection('prices', function(err, results){
        if (results) console.log('Drop "prices" collection successing');
    });
    
    mongoose.connection.dropCollection('groups', function(err, results){
        if (results) console.log('Drop "groups" collection successing');
        mongoose.connection.close();
    });
},1000);
