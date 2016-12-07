const mongoose = require('mongoose');
const server = require('../server');

mongoose.connect( 'mongodb://localhost/fullstack-demo-db' );

const db = mongoose.connection;

db.on('error', function (err) {
	server.log.error('MongoDB connection error: ', err.message);
});

db.once('open', function callback () {
    server.log.info("Connected to MongoDB");
});

module.exports = mongoose;