require('dotenv').config();
const session = require( 'express-session' );
const getUUID = require( 'uuid/v1' );
const RedisStore = require( 'connect-redis' )( session );
const redisClient = require( './Redis/' );
const constants = require('./constants');

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

const {
    REDIS_KEYS: { SESSION },
    SESSION: { NAME: name, MAX_AGE: maxAge },
    PORT
} = constants;

let { DOMAIN: domain } = constants;
const httpOnly = true;
let secure = true;

if ( !isProduction ){
    domain = `localhost:${ PORT }`;
    secure = false;
}

const getSession = () => ( session( {
    secret: process.env.SESSION_SECRET,
    resave: 'false',
    genid: getUUID,
    name,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient.client, prefix: SESSION }),
    cookie: {
        // secure,
        // httpOnly,
        maxAge,
        // domain,
        // path: '/',
    }
} ) );

module.exports = getSession;