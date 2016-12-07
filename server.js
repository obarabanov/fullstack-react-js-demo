const restify = require('restify');
const bunyan = require('bunyan');
//import * as assert from 'assert';

const logServer = bunyan.createLogger({
    name: 'log',
    level: 'debug',//'trace',
    stream: process.stdout
});

const cfgPort = 3000;

const server = restify.createServer({
    name: 'REST APIs',
    log: logServer,
    version: '1.0.0'
});

module.exports = server;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

//  RequestLogger
//server.use(restify.requestLogger());

/**
 * Request handling before routing.
 * Note that req.params will be undefined, as that's filled in after routing.
 */
server.pre(function (req, res, next) {
    const log = req.log;
    log.info(`${req.method.toUpperCase()} ${req.url}`);
    //log.debug({ headers: req.headers }, 'req.Headers:');
    next();
});

/**
 * To be executed on all routes.
 */
server.use(function (req, res, next) {
    const log = req.log;
    //log.debug( {params: req.params}, 'req.Params:' );
    next();
});

//  for testing
server.get('/health', function (req, res, next) {
    res.json(200, { 'health': 'ok' });
    return next();
});

/**
 * Mapping static resources
 */
server.get('/', restify.serveStatic({
    directory: './public',
    file: 'application.html'
}));
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname,
    default: 'application.html'
}));

/**
 * API versioning
 */
const PATH = '/api/items/:id';
server.get({path: PATH, version: '1.1.3'}, sendV1);
server.get({path: PATH, version: '2.0.0'}, sendV2);

function sendV1(req, res, next) {
    res.send('item: ' + req.params.id);
    return next();
}

function sendV2(req, res, next) {
    res.json({item: req.params.id});
    return next();
}

server.listen(cfgPort, function () {
    console.log('%s listening at %s', server.name, server.url);
});
