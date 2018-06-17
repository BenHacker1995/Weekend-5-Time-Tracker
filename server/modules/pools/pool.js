const pg = require( 'pg' );

const config = {
    database: 'time_tracker',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 1000,
    multipleStatements: true
};

module.exports = new pg.Pool( config );