//'use strict';
const Hapi=require('hapi');


// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8800
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return 'hello world';
    }
});

// Write to Mongodb route
server.route({
    method:'GET',
    path:'/write',
    handler:function(request, h) {
		
		
		const MongoClient = require('mongodb').MongoClient;
		//const assert = require('assert');
		 
		// Connection URL
		const url = 'mongodb://localhost:27017';
		 
		// Database Name
		const dbName = 'myproject';
		 
		// Use connect method to connect to the server
		MongoClient.connect(url, function(err, client) {
		  //assert.equal(null, err);
		  console.log("Connected successfully to server");
		 
		  const db = client.db(dbName);
			db.collection('Persons', function (err, collection) {				
				collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
				collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
				collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
			});
		  client.close();
		});
        return 'Write Completed';
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();